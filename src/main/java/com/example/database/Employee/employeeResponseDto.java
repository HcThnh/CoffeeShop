package com.example.database.Employee;


import java.sql.Date;


public record employeeResponseDto(
    int id,
    String name,
    String phoneNumber,
    Date startDate,
    String position,
    int totalSalary,
    int unitSalary
) {
    
}
