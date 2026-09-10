package com.example.database.Controller;

import java.security.Principal;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.database.Employee.employeeUpdateDto;
import com.example.database.Order.orderDto;
import com.example.database.Relationship.exchangeResponseDto;
import com.example.database.Service.employeeService;
import com.example.database.Service.exchangeService;
import com.example.database.Service.orderService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;


@RestController
@PreAuthorize("hasRole('EMPLOYEE')")
@RequestMapping("/employee")
public class employeeController {
    private employeeService employeeService;
    private orderService orderService;
    private exchangeService exchangeService;

    public employeeController(
        employeeService employeeService,
        orderService orderService,
        exchangeService exchangeService
    ) {
        this.employeeService = employeeService;
        this.orderService = orderService;
        this.exchangeService = exchangeService;
    }

    @PostMapping("/order/create")
    public void createOrder(@RequestBody orderDto dto,Principal principal) {
        //TODO: process POST request
        orderService.createOrder(dto,principal.getName());
    }
    @PatchMapping("/update/info")
    public void updateInfo(@RequestBody employeeUpdateDto dto) {
        employeeService.updateEmployee(dto);
    }
    
    @GetMapping("/get/info")
    public employeeUpdateDto getEmployeeInfo(Principal principal) {
        return employeeService.getEmployeeInfo(principal.getName());
    }
    @GetMapping("view/exchange")
    public List<exchangeResponseDto> getAllExchange() {
        return exchangeService.getAllExchange();
    }
    
    
}
