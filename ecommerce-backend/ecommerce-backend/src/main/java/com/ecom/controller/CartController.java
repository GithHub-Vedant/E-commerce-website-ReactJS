package com.ecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.model.Cart;
import com.ecom.model.User;
import com.ecom.repository.CartRepository;
import com.ecom.repository.UserRepository;
import com.ecom.service.UserService;
import com.ecom.util.JwtUtil;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Cart>> getCartItems(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            List<Cart> cartItems = cartRepository.findByUser(user);
            return ResponseEntity.ok(cartItems);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/my-cart")
    public ResponseEntity<List<Cart>> getMyCart(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token);
            User user = userService.findByUsername(username);
            if (user != null) {
                List<Cart> cartItems = cartRepository.findByUser(user);
                return ResponseEntity.ok(cartItems);
            }
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<Cart> addToCart(@RequestBody Cart cart, @RequestHeader(value = "Authorization", required = false) String authHeader) {
        System.out.println("addToCart called with cart: " + cart);
        System.out.println("Authorization header: " + authHeader);
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token);
            System.out.println("Extracted username: " + username);
            
            User user = userService.findByUsername(username);
            if (user != null) {
                System.out.println("Found user: " + user.getUsername());
                
                // Validate required fields
                if (cart.getProduct() == null || cart.getQuantity() == null || cart.getPrice() == null) {
                    System.out.println("Missing required fields in cart");
                    return ResponseEntity.badRequest().build();
                }
                
                cart.setUser(user);
                Cart savedCart = cartRepository.save(cart);
                System.out.println("Saved cart with ID: " + savedCart.getId());
                return ResponseEntity.ok(savedCart);
            } else {
                System.out.println("User not found: " + username);
            }
        } else {
            System.out.println("No valid authorization header");
        }
        
        return ResponseEntity.badRequest().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long id, @RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token);
            User user = userService.findByUsername(username);
            if (user != null) {
                cartRepository.deleteByUserAndId(user, id);
                return ResponseEntity.ok().build();
            }
        }
        return ResponseEntity.notFound().build();
    }
}