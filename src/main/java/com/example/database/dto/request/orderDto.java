package com.example.database.dto.request;

import java.sql.Date;
import java.util.List;

public record orderDto(
    Date order_time,
    String customerPhoneNumber,
    List<productInOrderDto> producList   //Map<Id,quantity>
) {
    
}
