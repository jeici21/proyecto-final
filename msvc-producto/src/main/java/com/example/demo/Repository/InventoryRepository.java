package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.example.demo.Model.ProductInventory;

@Repository
public interface InventoryRepository extends JpaRepository<ProductInventory, Integer> {
	
    List<ProductInventory> findByQuantity(Integer id);

}
