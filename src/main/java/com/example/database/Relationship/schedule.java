package com.example.database.Relationship;

import com.example.database.Embedded.schedule_embed;
import com.example.database.Employee.employee;
import com.example.database.Shift.shift;

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
public class schedule {
    @EmbeddedId
    private schedule_embed id = new schedule_embed();

    @ManyToOne
    @MapsId("employeeId")
    @JoinColumn(name = "employee_ID")
    private employee employee;

    @ManyToOne
    @MapsId("shiftId")
    @JoinColumn(name = "shift_ID")
    private shift shift;

}
