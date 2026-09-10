package com.example.database.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class product {
    @Id
    @GeneratedValue
    private int id;
    private String name;
    private boolean isAvailable;
    private float rating=0;
    private String description;
    private float unit_price;
    private int discount;
    @Transient
    private int numOfRating = 0; //this attribute doesn't exist in the database
    private String type;


    
    @OneToMany(mappedBy = "product")
    private List<review> reviews= new ArrayList<>();
    @OneToMany(mappedBy = "product")
    private List<has> hases= new ArrayList<>();
    public void addHas(has has){
        this.hases.add(has);
        has.setProduct(this);
    }
    public void addReview(review review){
        this.reviews.add(review);
        review.setProduct(this);
    }
    public void updateRating(float score){
        numOfRating++;
        this.rating=(this.rating+score)/numOfRating;
    }
}
