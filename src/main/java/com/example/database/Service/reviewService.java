package com.example.database.Service;

import org.springframework.stereotype.Service;

import com.example.database.Embedded.review_embed;
import com.example.database.Relationship.reviewDto;
import com.example.database.Relationship.reviewMapper;
import com.example.database.Repository.customerRepo;
import com.example.database.Repository.reviewRepo;

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
