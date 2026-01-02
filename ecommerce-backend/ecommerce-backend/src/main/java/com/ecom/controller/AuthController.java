package com.ecom.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.model.User;
import com.ecom.service.UserService;
import com.ecom.util.JwtUtil;

@RestController
// Note: CORS handled globally in CorsConfig.java
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }
        
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }
        
        User savedUser = userService.saveUser(user);
        String token = jwtUtil.generateToken(savedUser.getUsername());
        Map<String, Object> response = new HashMap<>();
        response.put("id", savedUser.getId());
        response.put("username", savedUser.getUsername());
        response.put("email", savedUser.getEmail());
        response.put("token", token);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        // First try to find user by username, if not found try by email
        User existingUser = userService.findByUsername(user.getUsername());
        
        if (existingUser == null) {
            // If username not found, try to find by email
            existingUser = userService.findByEmail(user.getUsername());
        }
        
        if (existingUser != null) {
            // Validate user credentials using the service
            if (userService.validateUser(existingUser.getUsername(), user.getPassword())) {
                String token = jwtUtil.generateToken(existingUser.getUsername());
                Map<String, Object> response = new HashMap<>();
                response.put("id", existingUser.getId());
                response.put("username", existingUser.getUsername());
                response.put("email", existingUser.getEmail());
                response.put("token", token);
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body("Invalid username or password!");
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid username or password!");
        }
    }
}