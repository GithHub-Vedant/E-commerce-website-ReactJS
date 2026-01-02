package com.ecom.service;

import com.ecom.dto.OrderRequestDTO;
import com.ecom.model.Order;

public interface EcommerceService {
    Order createOrder(OrderRequestDTO orderRequest);
}