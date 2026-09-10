package com.example.database.Service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

import com.example.database.Relationship.exchangeDto;
import com.example.database.Relationship.exchangeMapper;
import com.example.database.Relationship.exchangeResponseDto;
import com.example.database.Repository.exchangeRepo;

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
