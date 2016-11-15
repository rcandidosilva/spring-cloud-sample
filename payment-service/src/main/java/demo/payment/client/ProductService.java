package demo.payment.client;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.hateoas.PagedResources;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient("product-service")
public interface ProductService {

    @RequestMapping(method = RequestMethod.GET, path = "/products")
    PagedResources<ProductDTO> findAll(@RequestParam("page") int page);

}