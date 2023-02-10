package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import com.example.demo.Model.Discount;

public interface DiscountService {

	
	public List<Discount> findAll();
	Discount save(Discount discount);
    public void delete(Integer id);
    public List<Discount> findByNombre(String term);
    public Optional<Discount> findDiscountByid(Integer id);
}
