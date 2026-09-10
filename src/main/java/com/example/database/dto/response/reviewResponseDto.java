package com.example.database.dto.response;

import java.sql.Date;

import com.example.database.entity.embedded.review_embed;

public record reviewResponseDto(
    review_embed id,
    Date date,
    int score,
    String comment,
    String customerName,
    String productName
) {
    
}
