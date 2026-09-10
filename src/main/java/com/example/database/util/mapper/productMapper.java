package com.example.database.util.mapper;

import org.springframework.stereotype.Service;

import com.example.database.dto.request.productDto;
import com.example.database.dto.response.productResponseDto;
import com.example.database.entity.product;

@Service
public class productMapper {
    public product tProduct(productDto dto){
        var product=new product();
        product.setName(dto.name());
        product.setUnit_price(dto.unit_price());
        product.setAvailable(true);
        product.setDiscount(0);
        return product;
    }
    public productResponseDto toProductResponseDto(product product){
        var productResponseDto=new productResponseDto(product.getName(),product.getUnit_price(),product.getDiscount(),product.getRating(),product.getDescription(),product.getId());
        return productResponseDto;
    }
}
