package com.example.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.database.entity.schedule;
import com.example.database.entity.embedded.schedule_embed;

public interface scheduleRepo extends JpaRepository<schedule,schedule_embed>{
    
}
