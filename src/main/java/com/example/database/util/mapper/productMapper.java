package com.example.database.util.mapper;

import org.springframework.stereotype.Service;
import java.util.List;

import com.example.database.dto.request.productDto;
import com.example.database.dto.response.productImageResponseDto;
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
        List<productImageResponseDto> images = product.getImages().stream()
            .map(image -> new productImageResponseDto(
                image.getId(),
                image.getImageUrl(),
                image.getAltText(),
                image.getSortOrder(),
                image.isPrimary()
            ))
            .toList();
        return new productResponseDto(
            product.getName(),
            product.getUnit_price(),
            product.getDiscount(),
            product.getRating(),
            product.getDescription(),
            product.getId(),
            images
        );
    }
}
