package com.example.database.controller;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.database.dto.request.employeeDto;
import com.example.database.dto.request.shiftDto;
import com.example.database.dto.request.productDto;
import com.example.database.dto.request.giftDto;
import com.example.database.dto.request.scheduleDto;
import com.example.database.dto.request.employeeCalSalaryDto;
import com.example.database.dto.request.employeeUpdateJobDto;
import com.example.database.dto.request.productUpdateDto;
import com.example.database.dto.response.employeeResponseDto;
import com.example.database.dto.response.shiftResponseDto;
import com.example.database.dto.response.giftResponseDto;
import com.example.database.dto.response.scheduleResponseDto;
import com.example.database.dto.response.orderResponseDto;
import com.example.database.dto.response.exchangeResponseDto;

import com.example.database.service.employeeService;
import com.example.database.service.exchangeService;
import com.example.database.service.giftService;
import com.example.database.service.orderService;
import com.example.database.service.productService;
import com.example.database.service.scheduleService;
import com.example.database.service.shiftService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.transaction.annotation.Transactional;


@RestController
@RequestMapping("/manager")
@PreAuthorize("hasRole('MANAGER')")
public class managerController {
    private DataSource dataSource;
    private PasswordEncoder passwordEncoder;
    private employeeService employeeService;
    private shiftService shiftService;
    private productService productService;
    private giftService giftService;
    private scheduleService scheduleService;
    private orderService orderService;
    private exchangeService exchangeService;

    public managerController(
        DataSource dataSource,
        PasswordEncoder passwordEncoder,
        employeeService employeeService,
        shiftService shiftService,
        productService productService,
        giftService giftService,
        scheduleService scheduleService,
        orderService orderService,
        exchangeService exchangeService
    ) {
        this.dataSource = dataSource;
        this.passwordEncoder = passwordEncoder;
        this.employeeService = employeeService;
        this.shiftService = shiftService;
        this.productService = productService;
        this.giftService = giftService;
        this.scheduleService = scheduleService;
        this.orderService = orderService;
        this.exchangeService = exchangeService;
    }

    @Transactional
    @PostMapping("create/employee")
    public String createEmployee(@RequestBody employeeDto dto) 
    {
        JdbcUserDetailsManager manager = new JdbcUserDetailsManager(dataSource);
        if(manager.userExists(dto.phoneNumber())){return "Username already exists";}

        UserDetails user = User.withUsername(dto.phoneNumber())
        .password(passwordEncoder.encode(dto.password()))
        .roles("EMPLOYEE")
        .build();
        manager.createUser(user);
        employeeService.addEmployee(dto);
        return "Employee is created successfully!";
    }
    @PostMapping("/create/shift")
    public void createShift(@RequestBody shiftDto dto) {
        shiftService.createShift(dto);
    }
    @GetMapping("/view/shifts")
    public List<shiftResponseDto> getAllShifts() {
        return shiftService.getAllShifts();
    }
    @PostMapping("/create/product")
    public void createProduct(@RequestBody productDto dto) {
        productService.addProduct(dto);
    }
    @PostMapping("/create/gift")
    public void createGift(@RequestBody giftDto dto) {
        giftService.addGift(dto);
    }
    @GetMapping("/view/employees")
    public List<employeeResponseDto> getAllEmployees() {
        return employeeService.findAllEmployee();
    }
    @PostMapping("/create/schedule")
    public void createSchedule(@RequestBody scheduleDto dto) {
        //TODO: process POST request
        scheduleService.createSchedule(dto);
    }
    @GetMapping("/view/schedule")
    public List<scheduleResponseDto> getAllSchedule() {
        return scheduleService.getAllSchedule();
    }
    @PatchMapping("/update/employee/salary")
    public void putMethodName(@RequestBody employeeCalSalaryDto dto) {
        //TODO: process PUT request
        employeeService.calculateSalary(dto);
    }
    @PatchMapping("/update/employee/job")
    public void updateEmployeeJob(@RequestBody employeeUpdateJobDto dto) {
        //TODO: process PUT request
        employeeService.updateEmployeeJob(dto);
    }
    @DeleteMapping("/delete/employee")
    public void delEmployee(@RequestParam int id){
         employeeService.delEmployee(id);
    }
    @GetMapping("/view/orders")
    public List<orderResponseDto> getOrders() {
        return orderService.getAllOrder();
    }
    
    @PatchMapping("/delete/gift")
    public void delGift(@RequestParam int id) {
        //TODO: process PUT request
        giftService.hideGift(id);
    }
    @PatchMapping("/delete/product")
    public void delProduct( @RequestParam int id) {
        //TODO: process PUT request
        productService.hideProduct(id);
    }
    @PatchMapping("/update/product")
    public void updateProduct(@RequestBody productUpdateDto dto) {
        //TODO: process PUT request
        productService.updateProduct(dto);
    }
    @PatchMapping("/update/gift")
    public void updateGift(@RequestBody giftResponseDto dto) {
        //TODO: process PUT request
        giftService.updateGift(dto);
    }
    @GetMapping("/view/exchange")
    public List<exchangeResponseDto> getAllExchange() {
        return exchangeService.getAllExchange();
    }
    @GetMapping("/income")
    public float incomeEachMonth(@RequestParam int year,@RequestParam int month) {
        return orderService.calIncomeEachMonth(year, month);
    }
    
}
