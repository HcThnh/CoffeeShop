package com.example.database.dto.response;

import java.sql.Date;
import java.util.List;

public record orderResponseDto(
    int id,
    float total_charge,
    Date order_time,
    String employeeName,
    String customerName,
    List<productInOrderResponseDto> producList
) {
    
}
