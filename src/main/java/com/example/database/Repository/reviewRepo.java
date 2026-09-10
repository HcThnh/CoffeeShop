package com.example.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.database.entity.review;
import com.example.database.entity.embedded.review_embed;

public interface reviewRepo extends JpaRepository<review,review_embed>{
    
}
