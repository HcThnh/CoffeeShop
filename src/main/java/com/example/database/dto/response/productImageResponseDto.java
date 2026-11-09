package com.example.database.dto.response;

public record productImageResponseDto(
    Long id,
    String imageUrl,
    String altText,
    int sortOrder,
    boolean primary
) {
}
