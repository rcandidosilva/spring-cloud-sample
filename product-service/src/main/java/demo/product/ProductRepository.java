package demo.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.Collection;

@RepositoryRestResource
interface ProductRepository extends JpaRepository<Product, Long> {

	@RestResource
    Collection<Product> findByName(@Param("name") String name);
}
