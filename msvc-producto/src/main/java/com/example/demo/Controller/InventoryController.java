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

import com.example.demo.Model.Product;
import com.example.demo.Model.ProductInventory;
import com.example.demo.Service.InventoryService;

@RestController
@RequestMapping("/inventory")
public class InventoryController {
	
	@Autowired
	private InventoryService inventoryService;
	
	
	@GetMapping
    public ResponseEntity<List<ProductInventory>> findAll(){
        List<ProductInventory> inventory = inventoryService.findAll();
        if(inventory.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(inventory);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ProductInventory>> getById(@PathVariable("id") Integer id){
        Optional<ProductInventory> inventory = inventoryService.findInventoryByid(id);
        if(inventory==null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(inventory);
    }


    @PostMapping("/save")
    public ResponseEntity<ProductInventory> save(@RequestBody ProductInventory inventory){
    	ProductInventory inventoryNew = inventoryService.save(inventory);
        return ResponseEntity.ok(inventoryNew);
    }
    
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, produces = "application/json")
    public void delete(@PathVariable Integer id) {
    	inventoryService.delete(id);
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<ProductInventory> update(@RequestBody ProductInventory inventory,@PathVariable("id") Integer id ){
    	
    	 ProductInventory inventoryedit= inventoryService.findInventoryByid(id).get();
    	 inventoryedit.setQuantity(inventory.getQuantity());
    	 
    	 ProductInventory inventoryNew = inventoryService.save(inventoryedit);
	        return ResponseEntity.ok(inventoryNew);
    	
    }

}
