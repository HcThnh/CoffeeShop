package com.example.database.Repository;

import java.sql.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.database.Customer.customer;


public interface customerRepo extends JpaRepository<customer,Integer>{
    public customer findByPhoneNumber(String phoneNumber);
    @Transactional
    public void deleteByPhoneNumber(String phoneNumber);
    @Transactional
    @Modifying
    @Query("update customer a set a.dob=:dob,a.address=:address,a.gender=:gender,a.name=:name where a.phoneNumber=:phoneNumber")
    public void updateCustomerInfo(@Param("dob") Date dob,
    @Param("address") String address,
    @Param("gender") Character gender,
    @Param("name") String name,
    @Param("phoneNumber") String phoneNumber
                                   );
}