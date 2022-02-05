package com.evgenie_tomer_itay.controllers;

import com.evgenie_tomer_itay.entities.Category;
import com.evgenie_tomer_itay.entities.Coupon;
import com.evgenie_tomer_itay.exceptions.companyExceptions.CompanyNotExistsException;
import com.evgenie_tomer_itay.exceptions.companyExceptions.NullFieldsException;
import com.evgenie_tomer_itay.exceptions.companyExceptions.companyNotOwnsCouponException;
import com.evgenie_tomer_itay.exceptions.couponExceptions.CouponAlreadyExistsException;
import com.evgenie_tomer_itay.exceptions.couponExceptions.couponNotExistsException;
import com.evgenie_tomer_itay.services.CompanyServiceImplementation;
import com.evgenie_tomer_itay.utilities.Credentials;
import com.evgenie_tomer_itay.utilities.SimpleTokenManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("company")
public class Company_controller {

	@Autowired
	CompanyServiceImplementation companyService;
	@Autowired
	SimpleTokenManager simpleTokenManager;

	@PostMapping("login")
	public ResponseEntity<?> login(@RequestBody Credentials cred) {
		System.out.println(new Date() + ": Got a new login: " + cred);
		try {
			companyService.login(cred.getEmail(), cred.getPassword());
			String token = simpleTokenManager.getNewToken();
			return new ResponseEntity<String>(token, HttpStatus.OK);
		} catch (CompanyNotExistsException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.ACCEPTED);
		}

	}

	@PostMapping("addCoupon")
	public ResponseEntity<?> addCoupon(@RequestBody Coupon coupon, @RequestHeader String token) {

		if (simpleTokenManager.isTokenExist(token)) {
			System.out.println("Token approved");
			try {
				companyService.addCoupon(coupon);
				return new ResponseEntity<String>("Coupon added successfully", HttpStatus.OK);

			} catch (CouponAlreadyExistsException | NullFieldsException e) {
				return new ResponseEntity<String>(e.getMessage(), HttpStatus.ACCEPTED);
			}
		}
		return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
	}

	@PutMapping("updateCoupon")
	public ResponseEntity<?> updateCoupon(@RequestBody Coupon coupon, @RequestHeader String token) {
		if (simpleTokenManager.isTokenExist(token)) {
			try {
				companyService.updateCoupon(coupon);
				return new ResponseEntity<String>("Coupon updated successfully", HttpStatus.OK);

			} catch (couponNotExistsException | CouponAlreadyExistsException | companyNotOwnsCouponException | NullFieldsException e) {
				return new ResponseEntity<String>(e.getMessage(), HttpStatus.ACCEPTED);
			}
		}
		return new ResponseEntity<String>("No session!", HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("deleteCoupon")
	public ResponseEntity<?> deleteCoupon(@RequestParam int id, @RequestHeader String token) {
		System.out.println("DELETE REQUEST");
		if (simpleTokenManager.isTokenExist(token)) {
			System.out.println("Token approved");
			try {
				companyService.deleteCoupon(id);
				return new ResponseEntity<String>("Coupon deleted successfully", HttpStatus.OK);

			} catch (couponNotExistsException | companyNotOwnsCouponException e) {
				return new ResponseEntity<String>(e.getMessage(), HttpStatus.ACCEPTED);
			}
		}
		return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);

	}

	@GetMapping("allCoupons")
	public ResponseEntity<?> getAllCoupons(@RequestHeader String token) {
		System.out.println("GOT A GET_ALL REQUEST FROM CLIENT");
		if (simpleTokenManager.isTokenExist(token)) {
			List<Coupon> coupons = companyService.getAllCoupons();
			return new ResponseEntity<>(coupons, HttpStatus.OK);
		}
		return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);

	}

	@GetMapping("getByCategory")
	public ResponseEntity<?> getCouponsByCategory(@RequestParam Category category, @RequestHeader String token) {
		if (simpleTokenManager.isTokenExist(token)) {
			System.out.println("Token approved");
			List<Coupon> filteredCoupons = companyService.getCouponsByCategory(category);
			return new ResponseEntity<>(filteredCoupons, HttpStatus.OK);
		}
		return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);

	}

	@GetMapping("getByPrice")
	public ResponseEntity<?> getCouponsByPrice(@RequestParam int price, @RequestHeader String token) {
		if (simpleTokenManager.isTokenExist(token)) {
			System.out.println("Token approved");
			List<Coupon> filteredCoupons = companyService.getCouponsByMaximumPrice(price);
			return new ResponseEntity<List<Coupon>>(filteredCoupons, HttpStatus.OK);
		}
		return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);

	}

	@GetMapping("getDetails")
	public ResponseEntity<?> getCompanyDetails(@RequestHeader String token) {
		if (simpleTokenManager.isTokenExist(token)) {
			System.out.println("Token approved");
			return new ResponseEntity<>(companyService.companyDetails(), HttpStatus.OK);
		}
		return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);

	}
}
