package com.example.database.Order;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import com.example.database.Customer.customer;
import com.example.database.Employee.employee;
import com.example.database.Relationship.has;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class _order {
    @Id
    @GeneratedValue
    private int id;
    private float total_charge;
    private Date order_time;

    @OneToMany(mappedBy = "_order")
    private List<has> hases = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "employee_ID")
    private employee employee; 
    
    @ManyToOne
    @JoinColumn(name = "customer_ID")
    private customer customer;
    public void addHas(has has){
        this.hases.add(has);
        has.set_order(this);
    }
}
