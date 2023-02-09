package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import com.example.demo.Model.ProductInventory;

public interface InventoryService {
	public List<ProductInventory> findAll();
	ProductInventory save(ProductInventory inventory);
    public void delete(Integer id);
    public Optional<ProductInventory> findInventoryByid(Integer id);
    public List<ProductInventory> findByQuantity(Integer id);

}
