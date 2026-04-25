package com.example.database.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.database.Order._order;
import java.util.List;


public interface orderRepo extends JpaRepository<_order,Integer>{
    @Query("SELECT o FROM _order o WHERE YEAR(o.order_time)=:year AND MONTH(o.order_time)=:month")
    List<_order> findByMonthAndYear(@Param("year") int year,@Param("month") int month);
}
