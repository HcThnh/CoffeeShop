package com.example.database.Relationship;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.database.Repository.employeeRepo;
import com.example.database.Repository.shiftRepo;
import com.example.database.Shift.shiftMapper;

@Service
public class scheduleMapper {
    @Autowired
    private employeeRepo employeeRepo;
    @Autowired
    private shiftRepo shiftRepo;
    @Autowired
    private shiftMapper shiftMapper;
    public schedule tSchedule(scheduleDto dto){
        var schedule = new schedule();
        schedule.getId().setDate(dto.date());
        schedule.getId().setEmployeeId(dto.employeeId());
        schedule.getId().setShiftId(dto.shiftId());
        
        var emp = employeeRepo.findById(dto.employeeId())
            .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy nhân viên với ID: " + dto.employeeId()));
        var sh = shiftRepo.findById(dto.shiftId())
            .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy ca làm việc với ID: " + dto.shiftId()));

        emp.addSchedule(schedule);
        sh.addSchedule(schedule);
        return schedule;
    }
    public scheduleResponseDto tScheduleResponseDto(schedule schedule){
        return new scheduleResponseDto(schedule.getId(),schedule.getId().getDate(),schedule.getEmployee().getName(),shiftMapper.tShiftResponseDto( schedule.getShift()));
    }
}
