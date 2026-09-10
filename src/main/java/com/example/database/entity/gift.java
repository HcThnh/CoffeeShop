package com.example.database.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class gift {
    @Id
    @GeneratedValue
    private int id;
    private boolean isAvailable;
    private String name;
    private int point;
    @OneToMany(mappedBy = "gift")
    private List<exchange> exchanges = new ArrayList<>();
    public void addExchange(exchange exchange){
        exchanges.add(exchange);
        exchange.setGift(this);
    }
}
