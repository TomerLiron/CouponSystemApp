package com.evgenie_tomer_itay.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
	@JsonIgnore
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

}
