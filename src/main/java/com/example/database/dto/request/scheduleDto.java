package com.example.database.dto.request;

import java.sql.Date;

public record scheduleDto(
    Date date,
    int employeeId,
    int shiftId
) {
    
}
