package com.ecom.service;

import com.ecom.model.Cart;
import com.ecom.model.User;

import java.util.List;

public interface CartService {
    List<Cart> getCartItemsByUser(User user);
    Cart addToCart(Cart cart);
    void removeFromCart(Long userId, Long cartId);
    void clearCartForUser(User user);
}