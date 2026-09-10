package com.example.database.dto.request;

import java.sql.Date;

public record exchangeDto(
    int giftId,
    int quantity,
    Date date
) {
    
}
