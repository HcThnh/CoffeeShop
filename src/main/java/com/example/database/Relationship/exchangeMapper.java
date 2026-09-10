package com.example.database.Relationship;
import org.springframework.stereotype.Service;

import com.example.database.Repository.customerRepo;
import com.example.database.Repository.giftRepo;

@Service
public class exchangeMapper {
    private customerRepo customerRepo;
    private giftRepo giftRepo;

    public exchangeMapper(
        customerRepo customerRepo,
        giftRepo giftRepo
    ) {
        this.customerRepo = customerRepo;
        this.giftRepo = giftRepo;
    }

    public exchangeResponseDto tExchangeResponseDto(exchange exchange){
        return new exchangeResponseDto(exchange.getQuantity(),exchange.getDate(),exchange.getCustomer().getName(),exchange.getGift().getName());
    }
    public exchange tExchange(exchangeDto dto,String phoneNumber){
        var exchange = new exchange();
        exchange.setDate(dto.date());
        exchange.setQuantity(dto.quantity());
        var gift = giftRepo.findById(dto.giftId()).orElse(null);
        gift.addExchange(exchange);
        var customer = customerRepo.findByPhoneNumber(phoneNumber);
        customer.addExchange(exchange);
        // customer.updatePoint(dto.quantity(),gift.getPoint());
        // customerRepo.save(customer);
        return exchange;
    }
}
