package com.ecom.service;

import com.ecom.model.Product;
import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(Long id);
    Product saveProduct(Product product);
    void deleteProduct(Long id);
    List<Product> getProductsByCategory(String category);
    List<Product> getNewProducts();
}