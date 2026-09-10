package com.example.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.database.entity.exchange;
import com.example.database.entity.customer;

public interface exchangeRepo extends JpaRepository<exchange,Integer>{
    List<exchange> findByCustomer(customer customer);
}
