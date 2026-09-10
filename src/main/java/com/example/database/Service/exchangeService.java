package com.example.database.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

import com.example.database.util.mapper.exchangeMapper;
import com.example.database.dto.request.exchangeDto;
import com.example.database.dto.response.exchangeResponseDto;
import com.example.database.repository.exchangeRepo;

@Service
public class exchangeService {
    private exchangeRepo repo;
    private exchangeMapper exchangeMapper;

    public exchangeService(
        exchangeRepo repo,
        exchangeMapper exchangeMapper
    ) {
        this.repo = repo;
        this.exchangeMapper = exchangeMapper;
    }

    public void createExchange(exchangeDto exchangeDto,String phoneNumber){
        repo.save(exchangeMapper.tExchange(exchangeDto, phoneNumber));
    }
    public List<exchangeResponseDto> getAllExchange(){
        return repo.findAll().stream()
        .map(exchangeMapper::tExchangeResponseDto)
        .collect(Collectors.toList());
    }
}
