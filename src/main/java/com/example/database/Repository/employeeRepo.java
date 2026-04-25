package com.example.database.Repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.database.Employee.employee;


import jakarta.transaction.Transactional;

import java.util.Date;



public interface employeeRepo extends JpaRepository<employee,Integer>{
    public employee findByPhoneNumber(String phoneNumber);
    @Transactional
    @Modifying
    @Query("update employee a set a.dob=:dob,a.address=:address,a.gender=:gender,a.name=:name where a.phoneNumber=:phoneNumber")
    public void updateEmployeeInfo(@Param("dob") Date dob,
                                    @Param("address") String address,
                                    @Param("gender") Character gender,
                                    @Param("name") String name,
                                    @Param("phoneNumber") String phoneNumber
                                   );
    @Transactional
    @Modifying
    @Query("update employee a set a.position=:position,a.unitSalary=:unitSalary where a.id=:id")
    public void updateEmployeeJob(@Param("position") String position,
                                  @Param("unitSalary") int unitSalary,
                                  @Param("id") int id);
}
