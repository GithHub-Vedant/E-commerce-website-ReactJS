package com.ecom.service;

public interface NotificationService {
    void sendOrderConfirmation(Long userId, String orderNumber);
    void sendWelcomeNotification(Long userId, String username);
    void sendShippingNotification(Long userId, String orderNumber);
}