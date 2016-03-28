package com.example.product.client;

import com.netflix.client.config.IClientConfig;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.loadbalancer.AvailabilityFilteringRule;
import com.netflix.loadbalancer.IPing;
import com.netflix.loadbalancer.IRule;
import com.netflix.loadbalancer.PingUrl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.cloud.sleuth.sampler.AlwaysSampler;
import org.springframework.context.annotation.Bean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;



@EnableZuulProxy
@EnableCircuitBreaker
//@EnableDiscoveryClient
@RibbonClient(name = "product-service",
		configuration = ProductServiceConfiguration.class)
@SpringBootApplication
public class ProductClientApplication {

	@Bean
	AlwaysSampler alwaysSampler() {
		return new AlwaysSampler();
	}

	public static void main(String[] args) {
		SpringApplication.run(ProductClientApplication.class, args);
	}
}



@RestController
@RequestMapping("/products")
class ProductApiGatewayRestController {

	@Autowired
	private RestTemplate restTemplate;

	@LoadBalanced
	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@HystrixCommand(fallbackMethod = "getProductNamesFallback")
	@RequestMapping("/names")
	public Collection<String> getProductNames() {
		ParameterizedTypeReference<Resources<ProductDTO>> ptr =
				new ParameterizedTypeReference<Resources<ProductDTO>>() {};
		ResponseEntity<Resources<ProductDTO>> responseEntity =
				this.restTemplate.exchange("http://product-service/products", HttpMethod.GET, null, ptr);
		return responseEntity.getBody()
				.getContent().stream()
				.map(ProductDTO::getName).collect(Collectors.toList());
	}

	public Collection<String> getProductNamesFallback() {
		return Collections.emptyList();
	}

}

class ProductDTO {

	private Long id;
	private String name;

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	@Override
	public String toString() {
		return "ProductDTO{" +
				"id=" + id +
				", name='" + name + '\'' +
				'}';
	}
}

class ProductServiceConfiguration {

	@Autowired
	IClientConfig ribbonClientConfig;

	@Bean
	public IPing ribbonPing(IClientConfig config) {
		return new PingUrl();
	}

	@Bean
	public IRule ribbonRule(IClientConfig config) {
		return new AvailabilityFilteringRule();
	}

}