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
public class shift{
    @Id
    @GeneratedValue
    private int id;
    private String startTime;
    private String endTime;
    private float hour;
    @OneToMany(mappedBy = "shift")
    private List<schedule> schedules = new ArrayList<>();
    public void addSchedule(schedule schedule){
        schedules.add(schedule);
        schedule.setShift(this);
    }
}
