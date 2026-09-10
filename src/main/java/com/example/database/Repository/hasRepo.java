package com.example.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.database.entity.has;
import com.example.database.entity.embedded.has_embed;

public interface hasRepo extends JpaRepository<has,has_embed>{
    
}
