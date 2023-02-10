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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.ProductCategory;
import com.example.demo.Model.ProductInventory;
import com.example.demo.Service.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {
	
	
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping
    public ResponseEntity<List<ProductCategory>> findAll(){
        List<ProductCategory> categorys = categoryService.findAll();
        if(categorys.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(categorys);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ProductCategory>> getById(@PathVariable("id") Integer id){
        Optional<ProductCategory> category = categoryService.findCategoryByid(id);
        if(category==null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(category);
    }


    @PostMapping("/save")
    public ResponseEntity<ProductCategory> save(@RequestBody ProductCategory category){

    	ProductCategory categoryNew = categoryService.save(category);
        return ResponseEntity.ok(categoryNew);
    }
    
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, produces = "application/json")
    public void delete(@PathVariable Integer id) {
        categoryService.delete(id);
    }
    
    
    @PutMapping("/update/{id}")
    public ResponseEntity<ProductCategory> update(@RequestBody ProductCategory category,@PathVariable("id") Integer id ){
    	
    	ProductCategory categoryedit= categoryService.findCategoryByid(id).get();
    	categoryedit.setName(category.getName());
    	categoryedit.setLongDesc(category.getLongDesc());
    	 
    	ProductCategory categoryNew = categoryService.save(categoryedit);
	        return ResponseEntity.ok(categoryNew);
    	
    }

}
