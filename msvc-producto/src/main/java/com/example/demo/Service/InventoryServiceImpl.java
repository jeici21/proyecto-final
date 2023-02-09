package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.ProductInventory;
import com.example.demo.Repository.InventoryRepository;

@Service
public class InventoryServiceImpl implements InventoryService{
	@Autowired
	private InventoryRepository repository;

	@Override
	public List<ProductInventory> findAll() {
		return repository.findAll();
	}

	@Override
	public ProductInventory save(ProductInventory inventory) {
		return repository.save(inventory);
	}

	@Override
	public void delete(Integer id) {
		repository.deleteById(id);
		
	}

	@Override
	public Optional<ProductInventory> findInventoryByid(Integer id) {
		return repository.findById(id);
	}

	@Override
	public List<ProductInventory> findByQuantity(Integer id) {
		return repository.findByQuantity(id);
	}
	

}
