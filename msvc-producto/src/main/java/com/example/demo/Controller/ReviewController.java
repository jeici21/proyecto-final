package com.example.demo.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Product;
import com.example.demo.Model.Review;
import com.example.demo.Service.ProductService;
import com.example.demo.Service.ReviewService;

@RestController
@RequestMapping("/review")
public class ReviewController {


    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Review>> findAll(){
        List<Review> reviews = reviewService.findAll();
        if(reviews.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Review>> getById(@PathVariable("id") Integer id){
        Optional<Review> review = reviewService.findReviewByid(id);
        if(review==null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(review);
    }

    @PostMapping("/save")
    public ResponseEntity<Review> save(@RequestBody Review review){
        Optional<Product> product= productService.findProductoByid(review.getProduct().getId());
    	review.setProduct(product.get());
        Review reviewNew = reviewService.save(review);
        return ResponseEntity.ok(reviewNew);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Review> update(@RequestBody Review review,@PathVariable("id") Integer id ){

       Optional<Product> product = productService.findProductoByid(review.getProduct().getId());
       Review review1 = reviewService.findReviewByid(id).get();
       review1.setRating(review.getRating());
       review1.setText(review.getText());
       review1.setProduct(product.get());
       Review reviewNew = reviewService.save(review1);
       return ResponseEntity.ok(reviewNew);
    }


}