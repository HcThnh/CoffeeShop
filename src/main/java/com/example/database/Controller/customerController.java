package com.example.database.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.database.service.exchangeService;
import com.example.database.service.reviewService;
import com.example.database.dto.request.customerUpdateDto;
import com.example.database.dto.request.exchangeDto;
import com.example.database.dto.request.reviewDto;
import com.example.database.dto.response.exchangeResponseDto;
import com.example.database.dto.response.orderResponseDto;
import com.example.database.service.customerService;

import java.security.Principal;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@PreAuthorize("hasRole('CUSTOMER')")
@RequestMapping("/customer")
public class customerController {
    private customerService customerService;
    private reviewService reviewService;
    private exchangeService exchangeService;

    public customerController(
        customerService customerService,
        reviewService reviewService,
        exchangeService exchangeService
    ) {
        this.customerService = customerService;
        this.reviewService = reviewService;
        this.exchangeService = exchangeService;
    }


    @DeleteMapping("/delete")
    public void delCustomer(Principal principal){
        customerService.delCustomerByUsername(principal.getName());
    }
    @PatchMapping("/updateInfo")
    public void updateCustomerInfo(Principal principal, @RequestBody customerUpdateDto dto) {
            customerService.updateCustomerInfo(dto);
    }
    @GetMapping("/order/view")
    public List<orderResponseDto> getMethodName(Principal principal) {
        return customerService.getOrder(principal.getName());
    }
    @PostMapping("/review/create")
    public void postWriteReview(@RequestBody reviewDto dto,Principal principal) {
        reviewService.createReview(dto,principal.getName());
        
    }
    @PostMapping("/gift/exchange")
    public void exchangeGift(@RequestBody exchangeDto dto,Principal principal) {
        exchangeService.createExchange(dto,principal.getName());
    }
    @GetMapping("/point")
    public int getPoint(Principal principal) {
        return customerService.getPoint(principal.getName());
    }
    @GetMapping("/info")
    public customerUpdateDto getInfo(Principal principal) {
        return customerService.getInfo(principal.getName());
    }
    @GetMapping("/gift/exchange/history")
    public List<exchangeResponseDto> getExchangeHistory(Principal principal) {
        return customerService.getExchange(principal.getName());
    }
    
}
