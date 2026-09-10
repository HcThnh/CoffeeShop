package com.example.database.dto.request;

public record productUpdateDto(
    String name,
    float unit_price,
    int discount,
    int id
    ) 
    {
    
}
