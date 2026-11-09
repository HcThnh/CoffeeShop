package com.example.database.dto.request;

public record productImageRequestDto(
    String imageUrl,
    String altText,
    int sortOrder,
    boolean primary
) {
}
