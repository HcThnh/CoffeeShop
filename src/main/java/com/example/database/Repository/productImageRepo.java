package com.example.database.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.database.entity.productImage;

public interface productImageRepo extends JpaRepository<productImage, Long> {
    List<productImage> findByProductIdOrderBySortOrderAscIdAsc(int productId);
    Optional<productImage> findByIdAndProduct_Id(Long id, int productId);
}
