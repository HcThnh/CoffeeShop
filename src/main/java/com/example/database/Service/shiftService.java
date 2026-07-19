package com.example.database.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.database.Repository.shiftRepo;
import com.example.database.Shift.shiftDto;
import com.example.database.Shift.shiftMapper;
import com.example.database.Shift.shiftResponseDto;

@Service
public class shiftService {
    @Autowired
    private shiftMapper shiftMapper;
    @Autowired
    private shiftRepo repo;
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

