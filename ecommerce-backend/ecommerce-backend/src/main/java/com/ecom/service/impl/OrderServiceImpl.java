package com.ecom.service.impl;

import com.ecom.model.Order;
import com.ecom.model.User;
import com.ecom.repository.OrderRepository;
import com.ecom.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Override
    public List<Order> getOrdersByUser(User user) {
        return orderRepository.findByUser(user);
    }
    
    @Override
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }
    
    @Override
    public java.util.Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }
    
    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}