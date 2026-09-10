package com.example.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.database.entity.gift;


public interface giftRepo extends JpaRepository<gift,Integer>{
    @Modifying
    @Transactional
    @Query("update gift a set a.isAvailable=false where a.id=:id")
    void hideGift(@Param("id") int id);
    List<gift> findByIsAvailable(boolean isAvailable);
    @Modifying
    @Transactional
    @Query("update gift a set a.name=:name,a.point=:point where a.id=:id")
    void updateGift(@Param("id") int id,@Param("name") String name,@Param("point") int point);
}
