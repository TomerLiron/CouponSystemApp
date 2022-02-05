package com.evgenie_tomer_itay.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString.Exclude;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Data
@Entity
@Table(name = "companies")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Company {
	
	public Company(int id) {
		this.id = id;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String email;

	@Column(columnDefinition = "LONGTEXT", nullable = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;

	@OneToMany(fetch = FetchType.EAGER, cascade = { CascadeType.REMOVE, CascadeType.MERGE, CascadeType.REFRESH,
			CascadeType.DETACH }, mappedBy = "company")
	@Exclude
	@JsonIgnore
	private List<Coupon> coupons;
	

	public void addToCoupons(Coupon coupon) {
		coupons.add(coupon);
		coupon.setCompany(this);

	}


	public void clearCoupons() {
		coupons.clear();
	}

	public void removeCoupon(Coupon coupon) {
		coupons.remove(coupon);
	}

}
