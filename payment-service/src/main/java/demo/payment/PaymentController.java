package demo.payment;

import demo.payment.client.ProductDTO;
import demo.payment.client.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.PagedResources;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private ProductService productService;

    @RequestMapping("/products")
    public Collection<ProductDTO> getProductsForPayment() {
        PagedResources<ProductDTO> products = productService.findAll(0);
        return products.getContent();
    }

}