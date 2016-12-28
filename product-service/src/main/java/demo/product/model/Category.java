package demo.product.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class Category implements Serializable {

    @Id @GeneratedValue
    private Long id;
}
