package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Discount;
import com.example.demo.Repository.DiscountRepository;

@Service
public class DiscountServiceImpl implements DiscountService{

	 @Autowired
	 private DiscountRepository discountRepository;

	@Override
	public List<Discount> findAll() {
		return discountRepository.findAll();
	}

	@Override
	public Discount save(Discount discount) {
		return discountRepository.save(discount);
	}

	@Override
	public void delete(Integer id) {
		discountRepository.deleteById(id);		
	}

	@Override
	public List<Discount> findByNombre(String term) {
		return discountRepository.findByName(term);
	}

	@Override
	public Optional<Discount> findDiscountByid(Integer id) {
		return discountRepository.findById(id);
	}
}
