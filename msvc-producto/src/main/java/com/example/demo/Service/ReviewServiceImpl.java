package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Review;
import com.example.demo.Repository.ReviewRepository;

@Service
public class ReviewServiceImpl implements  ReviewService{

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public List<Review> findAll() {
        return reviewRepository.findAll();
    }

    @Override
    public Review save(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public void delete(Integer id) {
        reviewRepository.deleteById(id);
    }

    @Override
    public Optional<Review> findReviewByid(Integer id) {
        return reviewRepository.findById(id);
    }
}