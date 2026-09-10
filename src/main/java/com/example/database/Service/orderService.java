package com.example.database.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.database.util.mapper.orderMapper;
import com.example.database.dto.request.orderDto;
import com.example.database.dto.response.orderResponseDto;
import com.example.database.repository.orderRepo;

@Service
public class orderService {
    private orderRepo repo;
    private orderMapper orderMapper;
    private hasService hasService;

    public orderService(
        orderRepo repo,
        orderMapper orderMapper,
        hasService hasService
    ) {
        this.repo = repo;
        this.orderMapper = orderMapper;
        this.hasService = hasService;
    }

    public void createOrder(orderDto dto,String phoneNumber){
        var order = orderMapper.t_order(dto,phoneNumber);
        repo.save(order);
        hasService.createHas(dto,order.getId());
    }
    public List<orderResponseDto> getAllOrder(){
        return repo.findAll().stream()
        .map(orderMapper::tOrderResponseDto)
        .collect(Collectors.toList());
    }
    public void delOrder(int id){
        repo.deleteById(id);
    }
    public float calIncomeEachMonth(int year, int month){
        var list = repo.findByMonthAndYear(year, month);
        float res = 0;
        for(var i:list){
            res+=i.getTotal_charge();
        }
        return res;
    }
}
