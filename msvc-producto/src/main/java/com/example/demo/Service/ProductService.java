package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import com.example.demo.Model.Product;

public interface ProductService {
	public List<Product> findAll();
	
	Product save(Product product);
	
	public void delete(Integer id);
	
	public Optional<Product> findProductoByid(Integer id);
	
	public List<Product> findByNombre(String term);
	
	

}
