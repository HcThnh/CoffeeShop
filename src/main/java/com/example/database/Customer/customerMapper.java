package com.example.database.Customer;

import org.springframework.stereotype.Service;

@Service
public class customerMapper {
    public customer toCustomer(customerDTO dto){
        var customer = new customer();
        customer.setPhoneNumber(dto.phoneNumber());
        customer.setPassword(dto.password());
        customer.setGender('U'); // default: Unknown, tránh NOT NULL constraint của PostgreSQL
        return customer;
    }
    public customerResponseDTO toCustomerResponseDTO(customer customer){
        var customerResponseDTO=new customerResponseDTO(customer.getId(),customer.getName(), customer.getAddress(), customer.getPhoneNumber());
        return customerResponseDTO;
    }
    public customerUpdateDto tCustomerUpdateDto(customer customer){
        return new customerUpdateDto(customer.getDob(),customer.getPhoneNumber(),customer.getAddress(),customer.getGender(),customer.getName());
    }
}
