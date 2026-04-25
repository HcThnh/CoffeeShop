package com.example.database.Employee;

import org.springframework.stereotype.Service;

@Service
public class employeeMapper {
    public employee tEmployee(employeeDto dto){
        var employee = new employee();
        employee.setUnitSalary(dto.unitSalary());
        employee.setPosition(dto.position());
        employee.setPhoneNumber(dto.phoneNumber());
        employee.setPassword(dto.password());
        employee.setGender('U');
        return employee;
    }
    public employeeResponseDto tEmployeeResponseDto(employee employee){
        return new employeeResponseDto(employee.getId(),employee.getName(),employee.getPhoneNumber(),employee.getStartDate(),employee.getPosition(),employee.getTotalSalary());
    }
    public employeeUpdateDto tEmployeeUpdateDto(employee employee){
        return new employeeUpdateDto(employee.getDob(),employee.getPhoneNumber(),employee.getAddress(),employee.getGender(),employee.getName());
    }
}
