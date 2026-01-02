package com.ecom.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecom.dto.OrderItemDTO;
import com.ecom.dto.OrderRequestDTO;
import com.ecom.model.Order;
import com.ecom.model.OrderItem;
import com.ecom.model.Product;
import com.ecom.model.User;
import com.ecom.repository.OrderRepository;
import com.ecom.repository.ProductRepository;
import com.ecom.repository.UserRepository;
import com.ecom.service.EcommerceService;

@Service
@Transactional
public class EcommerceServiceImpl implements EcommerceService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Override
    public Order createOrder(OrderRequestDTO orderRequest) {
        // Create new order
        Order order = new Order();
        
        // Set user
        User user = userRepository.findById(orderRequest.getUserId()).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        order.setUser(user);
        
        // Set addresses
        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setBillingAddress(orderRequest.getBillingAddress());
        
        // Set costs
        order.setShippingCost(orderRequest.getShippingCost());
        order.setTax(orderRequest.getTax());
        
        // Calculate total price
        BigDecimal totalPrice = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();
        
        for (OrderItemDTO itemDTO : orderRequest.getItems()) {
            Product product = productRepository.findById(itemDTO.getProductId()).orElse(null);
            if (product != null) {
                OrderItem orderItem = new OrderItem();
                orderItem.setProduct(product);
                orderItem.setQuantity(itemDTO.getQuantity());
                orderItem.setPrice(itemDTO.getPrice());
                
                // Set the order reference for this order item
                orderItem.setOrder(order);
                
                orderItems.add(orderItem);
                
                // Add to total price
                totalPrice = totalPrice.add(itemDTO.getPrice().multiply(BigDecimal.valueOf(itemDTO.getQuantity())));
            }
        }
        
        // Add shipping and tax to total
        totalPrice = totalPrice.add(orderRequest.getShippingCost() != null ? orderRequest.getShippingCost() : BigDecimal.ZERO);
        totalPrice = totalPrice.add(orderRequest.getTax() != null ? orderRequest.getTax() : BigDecimal.ZERO);
        
        order.setTotalPrice(totalPrice);
        order.setStatus("PENDING");
        order.setCreatedAt(LocalDateTime.now());
        
        // Set the order items before saving the order
        order.setOrderItems(orderItems);
        
        // Save the order (with cascade, this will save the order items as well)
        Order savedOrder = orderRepository.save(order);
        
        // Return the saved order
        return savedOrder;
    }
}