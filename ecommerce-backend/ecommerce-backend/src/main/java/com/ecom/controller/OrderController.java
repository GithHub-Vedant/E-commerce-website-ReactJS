package com.ecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.dto.OrderRequestDTO;
import com.ecom.model.Order;
import com.ecom.model.User;
import com.ecom.repository.UserRepository;
import com.ecom.service.EcommerceService;
import com.ecom.service.OrderService;

@RestController
// Note: CORS handled globally in CorsConfig.java
@RequestMapping("/api/orders")
public class OrderController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private EcommerceService ecommerceService;
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getUserOrders(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            List<Order> orders = orderService.getOrdersByUser(user);
            return ResponseEntity.ok(orders);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequestDTO orderRequest) {
        try {
            // Verify user exists before creating order
            User user = userRepository.findById(orderRequest.getUserId()).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body(null);
            }
            
            Order createdOrder = ecommerceService.createOrder(orderRequest);
            return ResponseEntity.ok(createdOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id)
                .map(order -> ResponseEntity.ok(order))
                .orElse(ResponseEntity.notFound().build());
    }
}