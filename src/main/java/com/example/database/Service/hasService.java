package com.example.database.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.database.Order.orderDto;
import com.example.database.Repository.hasRepo;
import com.example.database.Repository.orderRepo;
import com.example.database.Repository.productRepo;
import com.example.database.Relationship.has;

@Service
public class hasService {
    @Autowired
    hasRepo hasRepo;
    @Autowired
    productRepo productRepo;
    @Autowired
    orderRepo orderRepo;

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
