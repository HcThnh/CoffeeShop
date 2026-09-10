package com.example.database.service;

import org.springframework.stereotype.Service;

import com.example.database.util.mapper.reviewMapper;
import com.example.database.dto.request.reviewDto;
import com.example.database.repository.customerRepo;
import com.example.database.repository.reviewRepo;
import com.example.database.entity.embedded.review_embed;

@Service
public class reviewService {
    private reviewRepo repo;
    private reviewMapper reviewMapper;
    private customerRepo customerRepo;

    public reviewService(
        reviewRepo repo,
        reviewMapper reviewMapper,
        customerRepo customerRepo
    ) {
        this.repo = repo;
        this.reviewMapper = reviewMapper;
        this.customerRepo = customerRepo;
    }

    public void createReview(reviewDto dto,String phoneNumber){
        var review = reviewMapper.tReview(dto);
        customerRepo.findByPhoneNumber(phoneNumber).addReview(review);
        repo.save(review);
    }
    public void delReview(review_embed id){
        repo.deleteById(id);
    }
}
