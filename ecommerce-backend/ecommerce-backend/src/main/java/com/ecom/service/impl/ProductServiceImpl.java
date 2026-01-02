package com.ecom.service.impl;

import com.ecom.model.Product;
import com.ecom.repository.ProductRepository;
import com.ecom.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
    
    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }
    
    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    
    @Override
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }
    
    @Override
    public List<Product> getNewProducts() {
        return productRepository.findByIsNewTrue();
    }
}