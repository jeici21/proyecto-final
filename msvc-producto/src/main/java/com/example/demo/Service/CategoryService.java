package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import com.example.demo.Model.ProductCategory;

public interface CategoryService {

	  	public List<ProductCategory> findAll();
	  	ProductCategory save(ProductCategory category);
	    public void delete(Integer id);
	    public List<ProductCategory> findByNombre(String term);
	    public Optional<ProductCategory> findCategoryByid(Integer id);
}
