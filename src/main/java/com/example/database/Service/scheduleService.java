package com.example.database.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.database.util.mapper.scheduleMapper;
import com.example.database.repository.scheduleRepo;
import com.example.database.dto.request.scheduleDto;
import com.example.database.dto.response.scheduleResponseDto;
import com.example.database.entity.embedded.schedule_embed;

@Service
public class scheduleService {
    private scheduleRepo repo;
    private scheduleMapper scheduleMapper;

    public scheduleService(
        scheduleRepo repo,
        scheduleMapper scheduleMapper
    ) {
        this.repo = repo;
        this.scheduleMapper = scheduleMapper;
    }
    
    @Transactional
    public void createSchedule(scheduleDto dto){
        repo.save(scheduleMapper.tSchedule(dto));
    }
    public List<scheduleResponseDto> getAllSchedule(){
        return repo.findAll().stream()
        .map(scheduleMapper::tScheduleResponseDto)
        .collect(Collectors.toList());
    }
    @Transactional
    public void delSchedule(schedule_embed id){
        repo.deleteById(id);
    }
}
