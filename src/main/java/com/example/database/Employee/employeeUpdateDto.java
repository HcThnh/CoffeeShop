package com.example.database.Employee;


import java.sql.Date;


public record employeeUpdateDto(
    Date dob,
    String phoneNumber,
    String address,
    Character gender,
    String name
    ) {
    
}
