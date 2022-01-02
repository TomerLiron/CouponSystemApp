package com.evgenie_tomer_itay.movies;

 import org.springframework.boot.SpringApplication;
 import org.springframework.boot.autoconfigure.SpringBootApplication;
 import org.springframework.context.ConfigurableApplicationContext;

import java.time.LocalDate;
 import java.time.format.DateTimeFormatter;

@SpringBootApplication
public class CouponApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctx =SpringApplication.run(CouponApplication.class, args);
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//		LocalDate localDate= LocalDate.of(2002,3,6);
//		System.out.println(localDate);
//		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//		String date ="2021-12-12";
//		LocalDate localDate = LocalDate.parse(date, formatter);
//		System.out.println(localDate);
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	}

}
