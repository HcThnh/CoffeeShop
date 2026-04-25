package com.example.database.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.database.Customer.customerUpdateDto;
import com.example.database.Order.orderResponseDto;
import com.example.database.Relationship.exchangeDto;
import com.example.database.Relationship.exchangeResponseDto;
import com.example.database.Relationship.reviewDto;
import com.example.database.Service.customerService;
import com.example.database.Service.exchangeService;
import com.example.database.Service.reviewService;

import java.security.Principal;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@PreAuthorize("hasRole('CUSTOMER')")
@RequestMapping("/customer")
public class customerController {
    @Autowired
    DataSource dataSource;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private customerService customerService;
    @Autowired
    private reviewService reviewService;
    @Autowired
    private exchangeService exchangeService;


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
