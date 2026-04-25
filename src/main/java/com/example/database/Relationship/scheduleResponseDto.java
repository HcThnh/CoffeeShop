package com.example.database.Relationship;

import java.sql.Date;

import com.example.database.Embedded.schedule_embed;
import com.example.database.Shift.shiftResponseDto;

public record scheduleResponseDto(
    schedule_embed id,
    Date date,
    String employeeName,
    shiftResponseDto shiftResponseDto
) {
    
}
