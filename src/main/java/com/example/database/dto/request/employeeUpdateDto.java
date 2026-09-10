package com.example.database.dto.request;


import java.sql.Date;


public record employeeUpdateDto(
    Date dob,
    String phoneNumber,
    String address,
    Character gender,
    String name
    ) {
    
}
