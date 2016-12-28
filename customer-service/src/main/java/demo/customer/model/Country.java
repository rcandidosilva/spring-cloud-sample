package demo.customer.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class Country implements Serializable {

    @Id @GeneratedValue
    private Long id;

    private String name;

    private String abbrev;

}
