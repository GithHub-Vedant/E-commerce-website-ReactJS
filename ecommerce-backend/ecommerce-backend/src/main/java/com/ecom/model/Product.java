package com.ecom.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {
    
    public Product() {}
    
    public Product(Long id, String name, String description, BigDecimal price, BigDecimal oldPrice, String category, String image, int stock, boolean isNew) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.oldPrice = oldPrice;
        this.category = category;
        this.image = image;
        this.stock = stock;
        this.isNew = isNew;
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(length = 1000)
    private String description;
    
    @Column(nullable = false)
    private BigDecimal price;
    
    private BigDecimal oldPrice;
    
    @Column(nullable = false)
    private String category;
    
    private String image;
    
    private int stock;
    
    @Column(name = "is_new")
    private boolean isNew;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public BigDecimal getOldPrice() {
        return oldPrice;
    }
    
    public void setOldPrice(BigDecimal oldPrice) {
        this.oldPrice = oldPrice;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public String getImage() {
        return image;
    }
    
    public void setImage(String image) {
        this.image = image;
    }
    
    public int getStock() {
        return stock;
    }
    
    public void setStock(int stock) {
        this.stock = stock;
    }
    
    public boolean getIsNew() {
        return isNew;
    }
    
    public void setIsNew(boolean isNew) {
        this.isNew = isNew;
    }
}