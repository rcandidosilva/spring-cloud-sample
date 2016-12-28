package demo.customer.repo;

import demo.customer.model.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface StateRepository extends JpaRepository<State, Long> {
}
