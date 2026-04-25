package com.example.database.Employee;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import com.example.database.Order._order;
import com.example.database.Relationship.schedule;


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
public class employee {
    @Id
    @GeneratedValue
    private int id;
    private Date dob;
    private String phoneNumber;
    private String address;
    private Character gender;
    private String name;
    private Date startDate;
    private String position;   //create enum: manager, cashier, barista, waiter
    private int unitSalary;
    private int totalSalary;
    private String password;
    @OneToMany(mappedBy = "employee")
    private List<schedule> schedules = new ArrayList<>();
    @OneToMany(mappedBy = "employee")
    private List<_order> _orders = new ArrayList<>();
    
    public void addOrder(_order order){
        this._orders.add(order);
        order.setEmployee(this);
    }
    public void addSchedule(schedule schedule){
        this.schedules.add(schedule);
        schedule.setEmployee(this);
    }
}
