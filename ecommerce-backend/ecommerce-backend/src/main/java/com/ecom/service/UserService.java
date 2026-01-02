package com.ecom.service;

import com.ecom.model.User;

public interface UserService {
    User findByUsername(String username);
    User findByEmail(String email);
    User saveUser(User user);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    
    boolean validateUser(String username, String password);
}