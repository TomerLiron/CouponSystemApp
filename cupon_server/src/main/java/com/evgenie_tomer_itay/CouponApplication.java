package com.evgenie_tomer_itay;

 import com.evgenie_tomer_itay.entities.Customer;
 import com.evgenie_tomer_itay.services.CustomerServiceImplementation;
 import com.evgenie_tomer_itay.utilities.SimpleTokenManager;
 import org.springframework.boot.SpringApplication;
 import org.springframework.boot.autoconfigure.SpringBootApplication;
 import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class CouponApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctx =SpringApplication.run(CouponApplication.class, args);
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		SimpleTokenManager simpleTokenManager = ctx.getBean(SimpleTokenManager.class);
		simpleTokenManager.initThread();
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	}

}
