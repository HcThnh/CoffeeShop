package com.example.database.util.mapper;

import org.springframework.stereotype.Service;

import com.example.database.dto.request.scheduleDto;
import com.example.database.dto.response.scheduleResponseDto;
import com.example.database.entity.schedule;
import com.example.database.repository.employeeRepo;
import com.example.database.repository.shiftRepo;

@Service
public class scheduleMapper {
    private employeeRepo employeeRepo;
    private shiftRepo shiftRepo;
    private shiftMapper shiftMapper;

    public scheduleMapper(
        employeeRepo employeeRepo,
        shiftRepo shiftRepo,
        shiftMapper shiftMapper
    ) {
        this.employeeRepo = employeeRepo;
        this.shiftRepo = shiftRepo;
        this.shiftMapper = shiftMapper;
    }

    public schedule tSchedule(scheduleDto dto){
        var schedule = new schedule();
        schedule.getId().setDate(dto.date());
        schedule.getId().setEmployeeId(dto.employeeId());
        schedule.getId().setShiftId(dto.shiftId());
        
        var emp = employeeRepo.findById(dto.employeeId())
            .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy nhân viên với ID: " + dto.employeeId()));
        var sh = shiftRepo.findById(dto.shiftId())
            .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy ca làm việc với ID: " + dto.shiftId()));

        schedule.setEmployee(emp);
        schedule.setShift(sh);
        return schedule;
    }
    public scheduleResponseDto tScheduleResponseDto(schedule schedule){
        return new scheduleResponseDto(schedule.getId(),schedule.getId().getDate(),schedule.getEmployee().getName(),shiftMapper.tShiftResponseDto( schedule.getShift()));
    }
}
