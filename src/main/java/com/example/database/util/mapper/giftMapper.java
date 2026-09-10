package com.example.database.util.mapper;

import org.springframework.stereotype.Service;

import com.example.database.dto.request.giftDto;
import com.example.database.dto.response.giftResponseDto;
import com.example.database.entity.gift;

@Service
public class giftMapper {
    public giftResponseDto tGiftResponseDto(gift gift){
        return new giftResponseDto(gift.getId(),gift.getName(),gift.getPoint());
    }
    public gift tGift(giftDto dto){
        var gift = new gift();
        gift.setName(dto.name());
        gift.setPoint(dto.point());
        gift.setAvailable(true);
        return gift;
    }
}
