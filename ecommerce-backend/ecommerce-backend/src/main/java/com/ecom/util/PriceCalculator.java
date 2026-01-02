package com.ecom.util;

import com.ecom.model.Order;
import com.ecom.model.OrderItem;

import java.math.BigDecimal;
import java.util.List;

public class PriceCalculator {
    
    public static BigDecimal calculateSubtotal(List<OrderItem> items) {
        BigDecimal total = BigDecimal.ZERO;
        for (OrderItem item : items) {
            BigDecimal itemTotal = item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            total = total.add(itemTotal);
        }
        return total;
    }
    
    public static BigDecimal calculateTotal(Order order) {
        BigDecimal subtotal = calculateSubtotal(order.getOrderItems());
        
        BigDecimal shipping = order.getShippingCost() != null ? order.getShippingCost() : BigDecimal.ZERO;
        BigDecimal tax = order.getTax() != null ? order.getTax() : BigDecimal.ZERO;
        
        return subtotal.add(shipping).add(tax);
    }
    
    public static BigDecimal calculateShippingCost(BigDecimal orderTotal) {
        // Free shipping for orders over $1000, $50 otherwise
        if (orderTotal.compareTo(new BigDecimal("1000")) >= 0) {
            return BigDecimal.ZERO;
        } else {
            return new BigDecimal("50");
        }
    }
}