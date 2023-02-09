package com.example.demo.Model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "product_inventory")
@NoArgsConstructor
@AllArgsConstructor
public class ProductInventory implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "quantity", nullable = true,length = 250)
    private Integer quantity;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "create_at")
    private Date createAt;

    @Column(name = "modified_at")
    private Date modified_at;
    
    @Column(name = "deleted_at")
    private Date deleted_at;
    
    @JsonManagedReference(value="prodcut-Inventory")
    @OneToOne( cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Product product;
    //private List<Product> product;

}