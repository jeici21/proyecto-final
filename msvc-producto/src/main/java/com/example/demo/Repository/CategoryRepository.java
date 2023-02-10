package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Model.ProductCategory;

@Repository
public interface CategoryRepository extends JpaRepository<ProductCategory, Integer> {

    List<ProductCategory> findByName (String name);

}
