package demo.customer.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Entity
public class Address implements Serializable {

    @Id @GeneratedValue
    private Long id;

    private String addressLine;

    private String zipCode;

    private String phone;

    @ManyToOne
    private City city;

}
