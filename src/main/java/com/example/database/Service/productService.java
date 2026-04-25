package com.example.database.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.database.Product.productDto;
import com.example.database.Product.productMapper;
import com.example.database.Product.productResponseDto;
import com.example.database.Product.productUpdateDto;
import com.example.database.Relationship.reviewResponseDto;
import com.example.database.Repository.productRepo;

@Service
public class productService {
    @Autowired
    private productRepo repo;
    @Autowired
    private productMapper mapper;
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
