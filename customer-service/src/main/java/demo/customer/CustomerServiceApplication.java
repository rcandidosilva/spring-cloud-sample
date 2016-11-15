package demo.customer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@EnableDiscoveryClient
@SpringBootApplication
public class CustomerServiceApplication {

	@Bean
	CommandLineRunner runner(CustomerRepository repo) {
		return args -> {
			Arrays.asList("Rodrigo, Joao, Maria, Jose".split(","))
					.forEach(x -> repo.save(new Customer(x)));
			repo.findAll().forEach(System.out::println);
		};
	}

	public static void main(String[] args) {
		SpringApplication.run(CustomerServiceApplication.class, args);
	}
}