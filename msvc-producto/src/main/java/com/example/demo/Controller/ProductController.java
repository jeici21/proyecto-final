package com.example.demo.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Discount;
import com.example.demo.Model.Product;
import com.example.demo.Model.ProductCategory;
import com.example.demo.Model.ProductInventory;
import com.example.demo.Service.CategoryService;
import com.example.demo.Service.DiscountService;
import com.example.demo.Service.InventoryService;
import com.example.demo.Service.ProductService;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
	
	@Autowired
    private ProductService productService;
	
	@Autowired
    private CategoryService categoryService;
	
	@Autowired
    private InventoryService inventoryService;
	
	@Autowired
    private DiscountService discountService;
	
	
	@GetMapping
    public ResponseEntity<List<Product>> findAll(){
        List<Product> products = productService.findAll();
        if(products.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(products);
    }
	
	 @GetMapping("/{id}")
	    public ResponseEntity<Optional<Product>> getById(@PathVariable("id") Integer id){
	        Optional<Product> product = productService.findProductoByid(id);
	        if(product==null)
	            return ResponseEntity.notFound().build();
	        return ResponseEntity.ok(product);
	    }
	 
	  @PostMapping(value ="/save", produces = "application/json")
	    public ResponseEntity<Product> save(@RequestBody Product product){

	       Optional<ProductCategory> category= categoryService.findCategoryByid(product.getProductCategory().getId());
	       Optional<ProductInventory> inventory= inventoryService.findInventoryByid(product.getProductInventory().getId());
	       
	       if(category.isEmpty() || inventory.isEmpty())
	    	   return ResponseEntity.noContent().build();
	       
	        product.setProductCategory(category.get());
	        product.setProductInventory(inventory.get());
	        Product productNew = productService.save(product);
	        return ResponseEntity.ok(productNew);
	    }
	  
	  @PutMapping("/update/{id}")
	    public ResponseEntity<Product> update(@RequestBody Product product,@PathVariable("id") Integer id ){
	        Optional< ProductCategory> category= categoryService.findCategoryByid(product.getProductCategory().getId());
	        Optional< ProductInventory> inventory= inventoryService.findInventoryByid(product.getProductInventory().getId());
	        Optional< Discount> discount= discountService.findDiscountByid(product.getDiscount().getId());
	        if(category.isEmpty() || inventory.isEmpty())
		    	   return ResponseEntity.noContent().build();
	        
	        Product product1= productService.findProductoByid(id).get();
	        
	        product1.setName(product.getName());
	        product1.setLongdesc(product.getLongdesc());
	        product1.setDescription(product.getDescription());
	        product1.setSku(product.getSku());
	        product1.setImg(product.getImg());
	        product1.setDimensions(product.getDimensions());
	        product1.setWeight(product.getWeight());
	        product1.setPrice(product.getPrice());
	        //product1.setStatus(product.isStatus());
	        product1.setProductInventory(inventory.get());
	        product1.setProductCategory(category.get());
	        product1.setDiscount(discount.get());
	        Product productNew = productService.save(product1);
	        return ResponseEntity.ok(productNew);
	    }
	  @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, produces = "application/json")
	    public void delete(@PathVariable Integer id) {
	        productService.delete(id);
	    }

}
