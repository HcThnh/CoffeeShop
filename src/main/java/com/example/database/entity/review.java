package com.example.database.entity;


import java.sql.Date;

import com.example.database.entity.embedded.review_embed;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class review {
    @EmbeddedId
    private review_embed id = new review_embed();
    @ManyToOne
    @MapsId("customerId")
    @JoinColumn(name = "customer_ID")
    private customer customer;
    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_ID")
    private product product;
    private int score;
    private Date date;
    private String comment;
}
