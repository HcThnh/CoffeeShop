package com.example.database.Order;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.database.Product.productInOrderResponseDto;
import com.example.database.Relationship.has;
import com.example.database.Repository.customerRepo;
import com.example.database.Repository.employeeRepo;
import com.example.database.Repository.orderRepo;
import com.example.database.Repository.productRepo;

@Service
public class orderMapper {
    @Autowired
    private customerRepo customerRepo;
    @Autowired
    private employeeRepo employeeRepo;
    @Autowired
    private productRepo productRepo;
    
    @Autowired
    orderRepo orderRepo;
    
    public _order t_order(orderDto dto,String phoneNumber){
        var order= new _order();
        // orderRepo.save(order);
        order.setOrder_time(dto.order_time());
        var producList = dto.producList();
        float total_charge = 0;
        for(var i : producList){
            var product = productRepo.findById(i.productId()).orElse(null);
            float price = product.getUnit_price()*i.quantity()*(100-product.getDiscount())/100;
            total_charge+=price;
        }
        order.setTotal_charge(total_charge);
        customerRepo.findByPhoneNumber(dto.customerPhoneNumber()).addOrder(order);
        employeeRepo.findByPhoneNumber(phoneNumber).addOrder(order);
        return order;
    }
    public orderResponseDto tOrderResponseDto(_order order){
        List<productInOrderResponseDto> productInOrderResponseDtoList = new ArrayList<>();
        var list = order.getHases();
        for(has i:list){
            var productInOrderResponseDto = new productInOrderResponseDto(i.getProduct().getName(), i.getQuantity());
            productInOrderResponseDtoList.add(productInOrderResponseDto);
        }
        String cusName = "";
        String empName="";
        if(order.getCustomer()==null){ cusName = "Not Found";}
        else cusName = order.getCustomer().getName();
        if(order.getEmployee()==null) empName = "Not Found";
        else empName = order.getEmployee().getName();
        return new orderResponseDto(order.getId(),order.getTotal_charge(),order.getOrder_time(),empName,cusName,productInOrderResponseDtoList);
    }
}
