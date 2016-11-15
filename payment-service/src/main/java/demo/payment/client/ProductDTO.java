package demo.payment.client;

public class ProductDTO {

	private Long id;
	private String name;

	public ProductDTO() {
		super();
	}

	public ProductDTO(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}
}
