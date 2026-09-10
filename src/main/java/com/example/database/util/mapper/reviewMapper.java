package com.example.database.util.mapper;

import org.springframework.stereotype.Service;

import com.example.database.dto.request.reviewDto;
import com.example.database.entity.review;
import com.example.database.repository.productRepo;

@Service
public class reviewMapper {
    private productRepo productRepo;

    public reviewMapper(productRepo productRepo) {
        this.productRepo = productRepo;
    }

    public review tReview(reviewDto dto){
        var review = new review();
        review.setDate(dto.date());
        review.setScore(dto.score());
        review.setComment(dto.comment());
        var product = productRepo.findById(dto.productId()).orElse(null);
        product.addReview(review);
        // product.updateRating(dto.score());
        // productRepo.save(product);
        return review;
    }
    // public reviewResponseDto tReviewResponseDto(review review){
    //     return new reviewResponseDto(review.getId(), review.getDate(), review.getScore(), review.getComment());
    // }
}
