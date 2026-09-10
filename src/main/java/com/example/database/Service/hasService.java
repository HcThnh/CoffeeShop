package com.example.database.service;

import org.springframework.stereotype.Service;

import com.example.database.repository.hasRepo;
import com.example.database.repository.productRepo;
import com.example.database.repository.orderRepo;
import com.example.database.dto.request.orderDto;
import com.example.database.entity.has;

@Service
public class hasService {
    private hasRepo hasRepo;
    private productRepo productRepo;
    private orderRepo orderRepo;

    public hasService(
        hasRepo hasRepo,
        productRepo productRepo,
        orderRepo orderRepo
    ) {
        this.hasRepo = hasRepo;
        this.productRepo = productRepo;
        this.orderRepo = orderRepo;
    }

    public void createHas(orderDto dto,int orderId){
        var list = dto.producList();
        for(var i:list){
            var has = new has();
            var product = productRepo.findById(i.productId()).orElse(null);
            product.addHas(has);
            orderRepo.findById(orderId).orElse(null).addHas(has);
            has.setQuantity(i.quantity());
            has.setPrice(product.getUnit_price()*i.quantity()*(100-product.getDiscount())/100);
            hasRepo.save(has);
        }
    }
}
