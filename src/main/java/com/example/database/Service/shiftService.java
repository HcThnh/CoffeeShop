package com.example.database.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.database.util.mapper.shiftMapper;
import com.example.database.repository.shiftRepo;
import com.example.database.dto.request.shiftDto;
import com.example.database.dto.response.shiftResponseDto;

@Service
public class shiftService {
    private shiftMapper shiftMapper;
    private shiftRepo repo;

    public shiftService(
        shiftMapper shiftMapper,
        shiftRepo shiftRepo
    ) {
        this.shiftMapper = shiftMapper;
        this.repo = shiftRepo;
    }

    public void createShift(shiftDto dto){
        repo.save(shiftMapper.tShift(dto));
    }
    public void delShift(int id){
        repo.deleteById(id);
    }
    public List<shiftResponseDto> getAllShifts(){
        return repo.findAll().stream()
        .map(shiftMapper::tShiftResponseDto)
        .collect(Collectors.toList());
    }
}

