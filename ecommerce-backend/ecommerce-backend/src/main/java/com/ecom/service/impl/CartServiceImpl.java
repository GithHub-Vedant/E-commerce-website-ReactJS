package com.ecom.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.model.Cart;
import com.ecom.model.User;
import com.ecom.repository.CartRepository;
import com.ecom.repository.UserRepository;
import com.ecom.service.CartService;

@Service
public class CartServiceImpl implements CartService {
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public List<Cart> getCartItemsByUser(User user) {
        return cartRepository.findByUser(user);
    }
    
    @Override
    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }
    
    @Override
    public void removeFromCart(Long userId, Long cartId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            cartRepository.deleteByUserAndId(user, cartId);
        }
    }
    
    @Override
    public void clearCartForUser(User user) {
        List<Cart> cartItems = cartRepository.findByUser(user);
        cartRepository.deleteAll(cartItems);
    }
}