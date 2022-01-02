package com.evgenie_tomer_itay.movies.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString.Exclude;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "coupons")
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Coupon {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private int id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "company_id")
	private Company company;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "customers_vs_coupons", joinColumns = @JoinColumn(name = "coupon_id"), inverseJoinColumns = @JoinColumn(name = "customer_id"))
	@Exclude
	private List<Customer> customers;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Category category;
	
	@Column(nullable = false)
	private String title;
	
	@Column(nullable = false)
	private String description;
	
	@Column(nullable = false)
	private LocalDate startDate;
	
	@Column(nullable = false)
	private LocalDate endDate;
	
	@Column(nullable = false)
	private Integer amount;
	
	@Column(nullable = false)
	private Double price;
	
	@Column(nullable = false)
	private String image;

	@Override
	public String toString() {
		return "Coupon{" +
			   "id=" + id +
			   ", company=" + company.getId() +
			   ", category=" + category +
			   ", title='" + title + '\'' +
			   ", description='" + description + '\'' +
			   ", startDate=" + startDate +
			   ", endDate=" + endDate +
			   ", amount=" + amount +
			   ", price=" + price +
			   ", image='" + image + '\'' +
			   '}';
	}

	//	public Coupon( Category category, String title, String description, LocalDate startDate,
//				   LocalDate endDate, Integer amount, Double price, String image) {
//		this.category = category;
//		this.title = title;
//		this.description = description;
//		this.startDate = startDate;
//		this.endDate = endDate;
//		this.amount = amount;
//		this.price = price;
//		this.image = image;
//	}
}
