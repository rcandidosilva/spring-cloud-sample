package demo.product;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.sleuth.sampler.AlwaysSampler;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Arrays;
import java.util.Collection;

@EnableDiscoveryClient
@SpringBootApplication
public class ProductServiceApplication {

	@Bean
	AlwaysSampler alwaysSampler() {
		return new AlwaysSampler();
	}

	@Bean
	CommandLineRunner runner(ProductRepository repo) {
		return args -> {
			Arrays.asList("iPhone 6S, Galaxy S7, Moto X Play, Macbook Pro'13".split(","))
					.forEach(x -> repo.save(new Product(x)));
			repo.findAll().forEach(System.out::println);
		};
	}

	public static void main(String[] args) {
		SpringApplication.run(ProductServiceApplication.class, args);
	}
}

@RefreshScope
@RestController
class MessageRestController {

	@Value("${message}")
	private String message;

	@RequestMapping("/message")
	String message() {
		return this.message;
	}
}

@RepositoryRestResource
interface ProductRepository extends JpaRepository<Product, Long> {

	@RestResource
	Collection<Product> findByName(@Param("name") String name);
}

@Entity
class Product {

	@Id @GeneratedValue
	private Long id;
	private String name;

	public Product() {
		super();
	}

	public Product(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	@Override
	public String toString() {
		return "Product{" +
				"id=" + id +
				", name='" + name + '\'' +
				'}';
	}
}