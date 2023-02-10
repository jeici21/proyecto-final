package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Model.Product;
import com.example.demo.Model.ProductCategory;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	List<Product> findByName (String name);
	
	List<ProductCategory> findByProductCategory (ProductCategory productCategory);
}
