package com.example.database.Relationship;

import org.springframework.stereotype.Service;

import com.example.database.Repository.productRepo;

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
