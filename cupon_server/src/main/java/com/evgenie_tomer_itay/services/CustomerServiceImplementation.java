package com.evgenie_tomer_itay.services;


import com.evgenie_tomer_itay.entities.Coupon;
import com.evgenie_tomer_itay.entities.Customer;
import com.evgenie_tomer_itay.exceptions.couponExceptions.couponExpiredException;
import com.evgenie_tomer_itay.exceptions.couponExceptions.couponNotExistsException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.CustomerAlreadyExistsException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.couponAlreadyPurchasedException;
import com.evgenie_tomer_itay.exceptions.couponExceptions.noCouponsLeftException;
import com.evgenie_tomer_itay.repositories.CouponRepository;
import com.evgenie_tomer_itay.repositories.CustomerRepository;
import com.evgenie_tomer_itay.utilities.Validations;
import jdk.jfr.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Scope("prototype")
public class CustomerServiceImplementation extends ClientService implements CustomerService {

	@Autowired
	CouponRepository couponRepository;
	@Autowired
	CustomerRepository customerRepository;
	@Autowired
	Validations validations;

	private int customerId = -1;

	@Override
	public void login(String email, String password) throws CustomerAlreadyExistsException {
		System.out.println(email);
		validations.validateCustomerExists(email,password);
		System.out.println(password);
		customerId = customerRepository.findByEmailAndPassword(email, password).getId();
	}

	@Override
	public void purchaseCoupon(int couponId) {
		try {
			Customer customer = customerRepository.findById(customerId).get();
			List<Coupon> customerCoupons = getPurchasedCoupons();
			validations.validatePurchaseAllowed(couponId, customerCoupons);
			Coupon coupon = couponRepository.findById(couponId).get();
			coupon.setAmount(coupon.getAmount() - 1);
			customer.purchaseCoupon(coupon);
			couponRepository.save(coupon);
			customerRepository.save(customer);
		} catch (couponNotExistsException | noCouponsLeftException | couponExpiredException
				| couponAlreadyPurchasedException e) {
			System.err.println(e.getMessage());
		}

	}

	@Override

	public List<Coupon> getCouponsByCategory(Category category) {

		return couponRepository.findCustomerCouponsByCategory(customerId, category);
	}

	@Override

	public List<Coupon> getPurchasedCoupons() {

		return couponRepository.findByCustomerId(customerId);
	}

	@Override

	public List<Coupon> getCouponsByPrice(double price) {
		return couponRepository.findCustomerCouponsByPrice(customerId, price);

	}

	@Override

	public Customer getCustomerDetails() {
		return customerRepository.findById(customerId).get();
	}

}
