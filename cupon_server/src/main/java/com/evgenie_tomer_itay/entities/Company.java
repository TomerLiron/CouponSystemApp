package com.evgenie_tomer_itay.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString.Exclude;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "companies")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Company {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)

	private String email;

	@Column(columnDefinition = "LONGTEXT", nullable = false)
	private String password;

	@OneToMany(fetch = FetchType.EAGER, cascade = { CascadeType.REMOVE, CascadeType.MERGE, CascadeType.REFRESH,
			CascadeType.DETACH }, mappedBy = "company")
	@Exclude
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
