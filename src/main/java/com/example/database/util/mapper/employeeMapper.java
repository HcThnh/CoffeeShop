package com.example.database.util.mapper;

import org.springframework.stereotype.Service;

import com.example.database.dto.request.employeeDto;
import com.example.database.dto.request.employeeUpdateDto;
import com.example.database.dto.response.employeeResponseDto;
import com.example.database.entity.employee;

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
        return new employeeResponseDto(employee.getId(),employee.getName(),employee.getPhoneNumber(),employee.getStartDate(),employee.getPosition(),employee.getTotalSalary(),employee.getUnitSalary());
    }
    public employeeUpdateDto tEmployeeUpdateDto(employee employee){
        return new employeeUpdateDto(employee.getDob(),employee.getPhoneNumber(),employee.getAddress(),employee.getGender(),employee.getName());
    }
}
