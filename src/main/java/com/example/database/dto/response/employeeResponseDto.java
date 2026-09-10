package com.example.database.dto.response;


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
