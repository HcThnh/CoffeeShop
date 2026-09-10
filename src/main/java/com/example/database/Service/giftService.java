package com.example.database.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

import com.example.database.util.mapper.giftMapper;
import com.example.database.repository.giftRepo;
import com.example.database.dto.request.giftDto;
import com.example.database.dto.response.giftResponseDto;

@Service
public class giftService {
    private giftRepo repo;
    private giftMapper giftMapper;

    public giftService(
        giftRepo repo,
        giftMapper giftMapper
    ) {
        this.repo = repo;
        this.giftMapper = giftMapper;
    }

    public void addGift(giftDto dto){
        repo.save(giftMapper.tGift(dto));
    }
    public void hideGift(int id){
        repo.hideGift(id);
    }
    public void delGift(int id){
        repo.deleteById(id);
    }
    public List<giftResponseDto> findAllGift(){
        return repo.findByIsAvailable(true).stream()
        .map(giftMapper::tGiftResponseDto)
        .collect(Collectors.toList());
    }
    public void updateGift(giftResponseDto dto){
        repo.updateGift(dto.id(),dto.name(),dto.point());
    }
}
