package com.example.database.util.mapper;

import org.springframework.stereotype.Service;

import com.example.database.dto.request.shiftDto;
import com.example.database.dto.response.shiftResponseDto;
import com.example.database.entity.shift;

@Service
public class shiftMapper {
    public shift tShift(shiftDto dto){
        var shift = new shift();
        shift.setEndTime(dto.endTime());
        shift.setStartTime(dto.startTime());
        shift.setHour(dto.hour());
        return shift;
    }
    public shiftResponseDto tShiftResponseDto(shift shift){
        return new shiftResponseDto(shift.getId(),shift.getStartTime(), shift.getEndTime());
    }
}
