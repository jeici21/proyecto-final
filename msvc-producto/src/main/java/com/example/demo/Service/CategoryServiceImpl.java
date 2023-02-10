package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.ProductCategory;
import com.example.demo.Repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<ProductCategory> findAll() {
        return  categoryRepository.findAll();
    }

    @Override
    public ProductCategory save(ProductCategory category) {
        return categoryRepository.save(category);
    }

    @Override
    public void delete(Integer id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public List<ProductCategory> findByNombre(String term) {
        return categoryRepository.findByName(term);
    }

    @Override
    public Optional<ProductCategory> findCategoryByid(Integer id) {
        return categoryRepository.findById(id);
    }
}