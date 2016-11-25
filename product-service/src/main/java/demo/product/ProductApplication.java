package demo.product;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.sleuth.sampler.AlwaysSampler;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@EnableDiscoveryClient
@SpringBootApplication
public class ProductApplication {

	@Bean
	public AlwaysSampler defaultSampler() {
		return new AlwaysSampler();
	}

	@Bean
	CommandLineRunner runner(ProductRepository repo) {
		return args -> {
			Arrays.asList("iPhone 6S, Galaxy S7, Moto X Play, Macbook Pro'13".split(","))
					.forEach(x -> repo.save(new Product(x)));
		};
	}

	public static void main(String[] args) {
		SpringApplication.run(ProductApplication.class, args);
	}
}