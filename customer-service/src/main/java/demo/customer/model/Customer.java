package demo.customer.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
public class Customer implements Serializable {

	@Id
    @GeneratedValue
	private Long id;

    private String name;

	private String email;

	@OneToOne
	private Address address;

	public Customer() {
		super();
	}

	public Long getId() {
		return id;
	}

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}
