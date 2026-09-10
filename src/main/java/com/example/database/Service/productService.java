package com.example.database.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.database.util.mapper.productMapper;
import com.example.database.dto.request.productDto;
import com.example.database.dto.request.productUpdateDto;
import com.example.database.dto.response.productResponseDto;
import com.example.database.dto.response.reviewResponseDto;
import com.example.database.repository.productRepo;

@Service
public class productService {
    private productRepo repo;
    private productMapper mapper;

    public productService(
        productRepo repo,
        productMapper mapper
    ) {
        this.repo = repo;
        this.mapper = mapper;
    }

    public void addProduct(productDto dto){
        repo.save(mapper.tProduct(dto));
    }
    public List<productResponseDto> getAllProducts(){
        return repo.findByIsAvailable(true).stream()
        .map(mapper::toProductResponseDto)
        .collect(Collectors.toList());
    }
    public void hideProduct(int id){
        repo.hideProduct(id);
    }
    public void delProduct(int id){
        repo.deleteById(id);
    }
    public List<reviewResponseDto> getReview(int productId){
        var product = repo.findById(productId).orElse(null);
        var reviewList = product.getReviews();
        List<reviewResponseDto> res = new ArrayList<>();
        for(var i: reviewList){
            var reviewResponseDto = new reviewResponseDto(i.getId(),i.getDate(), i.getScore(),i.getComment(),i.getCustomer().getName(),product.getName());
            res.add(reviewResponseDto);
        }
        return res;
    }
    public void updateProduct(productUpdateDto dto){
        repo.updateProduct(dto.id(),dto.name(),dto.unit_price(),dto.discount());
    }
}
