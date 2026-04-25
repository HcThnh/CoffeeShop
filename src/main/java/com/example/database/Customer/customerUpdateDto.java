package com.example.database.Customer;

import java.sql.Date;


public record customerUpdateDto(
    Date dob,
    String phoneNumber,
    String address,
    Character gender,
    String name) {
    
}
