package com.example.database.Controller;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.database.Employee.employeeCalSalaryDto;
import com.example.database.Employee.employeeDto;
import com.example.database.Employee.employeeResponseDto;
import com.example.database.Employee.employeeUpdateJobDto;
import com.example.database.Gift.giftDto;
import com.example.database.Gift.giftResponseDto;
import com.example.database.Order.orderResponseDto;
import com.example.database.Product.productDto;
import com.example.database.Product.productUpdateDto;
import com.example.database.Relationship.exchangeResponseDto;
import com.example.database.Relationship.scheduleDto;
import com.example.database.Relationship.scheduleResponseDto;
import com.example.database.Service.employeeService;
import com.example.database.Service.exchangeService;
import com.example.database.Service.giftService;
import com.example.database.Service.orderService;
import com.example.database.Service.productService;
import com.example.database.Service.scheduleService;
import com.example.database.Service.shiftService;
import com.example.database.Shift.shiftDto;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.transaction.annotation.Transactional;


@RestController
@RequestMapping("/manager")
@PreAuthorize("hasRole('MANAGER')")
public class managerController {
    @Autowired
    DataSource dataSource;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    employeeService employeeService;
    @Autowired
    shiftService shiftService;
    @Autowired
    productService productService;
    @Autowired
    giftService giftService;
    @Autowired
    scheduleService scheduleService;
    @Autowired
    orderService orderService;
    @Autowired
    exchangeService exchangeService;

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
