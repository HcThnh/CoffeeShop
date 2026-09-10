package com.example.database.dto.response;

import java.sql.Date;

import com.example.database.entity.embedded.schedule_embed;

public record scheduleResponseDto(
    schedule_embed id,
    Date date,
    String employeeName,
    shiftResponseDto shiftResponseDto
) {
    
}
