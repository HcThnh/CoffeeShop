package com.example.database.dto.response;

public record productResponseDto(
    String name,
    float unit_price,
    int discount,
    float rating,
    String description,
    int id
) {
    
}
