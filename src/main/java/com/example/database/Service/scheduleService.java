package com.example.database.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.database.Embedded.schedule_embed;
import com.example.database.Relationship.scheduleDto;
import com.example.database.Relationship.scheduleMapper;
import com.example.database.Relationship.scheduleResponseDto;
import com.example.database.Repository.scheduleRepo;

@Service
public class scheduleService {
    @Autowired
    private scheduleRepo repo;
    @Autowired 
    private scheduleMapper scheduleMapper;
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
