package com.example.database.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.database.Customer.customerDTO;
import com.example.database.Customer.customerMapper;
import com.example.database.Customer.customerUpdateDto;
import com.example.database.Order.orderMapper;
import com.example.database.Order.orderResponseDto;
import com.example.database.Relationship.exchangeMapper;
import com.example.database.Relationship.exchangeResponseDto;
import com.example.database.Repository.customerRepo;


@Service
public class customerService {
    @Autowired
    private customerRepo repo;
    @Autowired
    private exchangeMapper exchangeMapper;
    @Autowired
    private orderMapper orderMapper;
    @Autowired
    private customerMapper customerMapper;
    @Autowired
    DataSource dataSource;

    public customerUpdateDto getInfo(String phoneNumber){
        var customer = repo.findByPhoneNumber(phoneNumber);
        if (customer == null) return null;
        return customerMapper.tCustomerUpdateDto(customer);
    }
    public List<exchangeResponseDto> getExchange(String phoneNumber){
        var customer = repo.findByPhoneNumber(phoneNumber);
        if (customer == null) return Collections.emptyList();
        return customer.getExchanges().stream().map(exchangeMapper::tExchangeResponseDto)
        .collect(Collectors.toList());
    }
    public List<orderResponseDto> getOrder(String phoneNumber){
        var customer = repo.findByPhoneNumber(phoneNumber);
        if (customer == null) return Collections.emptyList();
        return customer.get_orders()
        .stream().map(orderMapper::tOrderResponseDto).collect(Collectors.toList());
    }
    public void createCustomer(customerDTO dto){
        repo.save(customerMapper.toCustomer(dto));
    }
    @Transactional
    public void delCustomerByUsername(String phoneNumber){
        JdbcUserDetailsManager manager = new JdbcUserDetailsManager(dataSource);
        manager.deleteUser(phoneNumber);
        repo.deleteByPhoneNumber(phoneNumber);
    }
    public void updateCustomerInfo(customerUpdateDto dto){
        repo.updateCustomerInfo(dto.dob(),dto.address(),dto.gender(),dto.name(),dto.phoneNumber());
    }
    public int getPoint(String phoneNumber){
        var customer = repo.findByPhoneNumber(phoneNumber);
        if (customer == null) return 0;
        return customer.getPoint();
    }
}
