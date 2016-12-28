package demo.customer.repo;

import demo.customer.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.Collection;

@RepositoryRestResource
public interface CustomerRepository extends JpaRepository<Customer, Long> {

	@RestResource
    Collection<Customer> findByName(@Param("name") String name);
}
