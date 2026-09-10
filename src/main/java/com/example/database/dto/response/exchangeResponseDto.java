package com.example.database.dto.response;

import java.sql.Date;

public record exchangeResponseDto(
    int quantity,
    Date date,
    String customerName,
    String giftName
) {
    
}
