package com.example.database.dto.response;

import java.util.List;

public record productResponseDto(
    String name,
    float unit_price,
    int discount,
    float rating,
    String description,
    int id,
    List<productImageResponseDto> images
) {
    
}
