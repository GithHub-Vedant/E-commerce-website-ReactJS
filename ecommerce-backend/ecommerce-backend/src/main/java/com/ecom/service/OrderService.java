package com.ecom.service;

import com.ecom.model.Order;
import com.ecom.model.User;

import java.util.List;

public interface OrderService {
    List<Order> getOrdersByUser(User user);
    Order saveOrder(Order order);
    java.util.Optional<Order> getOrderById(Long id);
    void deleteOrder(Long id);
}