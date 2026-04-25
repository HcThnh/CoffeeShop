package com.example.database.Customer;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import com.example.database.Order._order;
import com.example.database.Relationship.exchange;
import com.example.database.Relationship.review;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class customer {
    @Id
    @GeneratedValue
    private int id;
    private Date dob;
    private String phoneNumber; //function as username
    private String address;
    private Character gender;
    private String name;
    private int point;
    private String password;
    private Date customerSince;
    @OneToMany(mappedBy = "customer")
    private List<review> reviews= new ArrayList<>();
    @OneToMany(mappedBy = "customer")
    private List<exchange> exchanges;
    @OneToMany(mappedBy = "customer")
    private List<_order> _orders= new ArrayList<>();
    public void addOrder(_order order){
        this._orders.add(order);
        order.setCustomer(this);
    }
    public void addExchange(exchange exchange){
        this.exchanges.add(exchange);
        exchange.setCustomer(this);
    }
    public void addReview(review review){
        this.reviews.add(review);
        review.setCustomer(this);
    }
    public void updatePoint(int quantity,int point){
        this.point = this.point - point*quantity;
    }
}
