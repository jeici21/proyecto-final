package com.example.demo.Model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@EntityListeners({AuditingEntityListener.class})
@Data
@Entity
@Table(name = "product")
@NoArgsConstructor
@AllArgsConstructor
public class Product  implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(name = "name", nullable = false,length = 250)
    private String name;
    
    @Column(name = "longdesc ", nullable = false,length = 600)
    private String longdesc;

    @Column(name = "description", nullable = false,length = 250)
    private String description;

    @Column(name = "sku", nullable = false,length = 250)
    private String sku;
    
    @Column(name = "img", nullable = false,length = 250)
    private String img;
    
    @Column(name = "dimensions", nullable = false,length = 250)
    private String dimensions;
    
    @Column(name = "weight", nullable = false,length = 250)
    private String weight;
    
    @Column(name = "price", nullable = false,length = 100)
    private double price;
    
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_at")
    private Date createAt;

    @LastModifiedDate
    @Version
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_at")
    private Date modified_at;
    

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "deleted_at")
    private Date deleted_at;
    
 // Que columna en la tabla Product tiene la FK

    @JsonBackReference(value="prodcut-Inventory")
    @JoinColumn(name = "inventory_id")
    @OneToOne(fetch = FetchType.LAZY)
    private ProductInventory ProductInventory;
    
    //@JsonBackReference(value="prodcut-category")
    @ManyToOne
    @JoinColumn(name="category_id", nullable=false)
    private ProductCategory productCategory;

    //@JsonBackReference(value="prodcut-discount")
    @ManyToOne
    @JoinColumn(name="discount_id", nullable=false)
    private Discount discount;
    
    //@JsonIgnore
    @JsonManagedReference(value="prodcut-reviews")	
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Review> reviews;

}
