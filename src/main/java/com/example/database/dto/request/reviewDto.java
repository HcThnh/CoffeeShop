package com.example.database.dto.request;

import java.sql.Date;

public record reviewDto(
    Date date,
    int score,
    String comment,
    int productId
) {
    
}
