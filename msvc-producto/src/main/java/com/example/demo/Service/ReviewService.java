package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import com.example.demo.Model.Review;

public interface ReviewService {

    public List<Review> findAll();
    Review save(Review review);
    public void delete(Integer id);
    public Optional<Review> findReviewByid(Integer id);
}
