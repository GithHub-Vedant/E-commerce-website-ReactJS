package com.ecom.repository;

import com.ecom.model.Cart;
import com.ecom.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUser(User user);
    void deleteByUserAndId(User user, Long id);
}