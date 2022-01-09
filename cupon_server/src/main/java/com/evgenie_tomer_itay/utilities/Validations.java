package com.evgenie_tomer_itay.utilities;

import com.evgenie_tomer_itay.entities.Company;
import com.evgenie_tomer_itay.entities.Coupon;
import com.evgenie_tomer_itay.entities.Customer;
import com.evgenie_tomer_itay.exceptions.couponExceptions.CouponAlreadyExistsException;
import com.evgenie_tomer_itay.exceptions.couponExceptions.couponExpiredException;
import com.evgenie_tomer_itay.exceptions.couponExceptions.couponNotExistsException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.CustomerAlreadyExistsException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.UpdateNotAllowedException;
import com.evgenie_tomer_itay.exceptions.companyExceptions.CompanyAlreadyExistsException;
import com.evgenie_tomer_itay.exceptions.companyExceptions.CompanyNotExistsException;
import com.evgenie_tomer_itay.exceptions.companyExceptions.companyNotOwnsCouponException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.couponAlreadyPurchasedException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.customerNotExistsException;
import com.evgenie_tomer_itay.exceptions.couponExceptions.noCouponsLeftException;
import com.evgenie_tomer_itay.repositories.CompanyRepository;
import com.evgenie_tomer_itay.repositories.CouponRepository;
import com.evgenie_tomer_itay.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class Validations {

	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	CustomerRepository customerRepository;
	@Autowired
	CouponRepository couponRepository;



	/*
	 * VALIDATIONS FOR CUSTOMERS
	 */

	public void validatePurchaseAllowed(int couponId, List<Coupon> coupons) throws couponNotExistsException,
			noCouponsLeftException, couponAlreadyPurchasedException, couponExpiredException {
		validateCouponExists(couponId);
		Coupon coupon = couponRepository.findById(couponId).get();
		// Validate Coupon actually exists
		if (coupon == null)
			throw new couponNotExistsException(
					"Can't purchase becuase coupon with id " + couponId + " does not exist!");

		// Validate Coupon is not sold out
		if (coupon.getAmount() == 0)
			throw new noCouponsLeftException("Can't purchase coupon because the amount is zero!");

		// Validate customer doesn't own coupon yet
		for (Coupon c : coupons) {
			if (c.getId() == coupon.getId())
				throw new couponAlreadyPurchasedException(
						"Can't purchase coupon becuase the coupon was already purchased!");
		}
		// Validate coupon not expired
		if (coupon.getEndDate().isBefore(LocalDate.now()))
			throw new couponExpiredException("Can't purchase coupon because coupon has expired!");
	}

	public void validateCustomerExists(String email,String password) throws CustomerAlreadyExistsException {
		if (!customerRepository.existsByEmailAndPassword(email, password))
			throw new CustomerAlreadyExistsException("Customer with the given email (" + email + ") and password does not exist!");
	}

	public void validateCustomerExists(String email) throws CustomerAlreadyExistsException {
		if (customerRepository.existsByEmail(email))
			throw new CustomerAlreadyExistsException("Customer with the given email (" + email + ") already exists!");
	}

	public void validateCustomerExists(int id) throws customerNotExistsException {
		if (!customerRepository.existsById(id))
			throw new customerNotExistsException("Customer with the given id (" + id + ") does not exist");
	}

	public void validateUpdateAllowed(Customer customer)
			throws CustomerAlreadyExistsException, customerNotExistsException {
		validateCustomerExists(customer.getId());
		Customer oldCustomer = customerRepository.getById(customer.getId());

		// Validate customer email is unique
		if (!oldCustomer.getEmail().equals(customer.getEmail())) {
			if (customerRepository.existsByEmail(customer.getEmail()))
				throw new CustomerAlreadyExistsException(
						"Can't apply the update because a customer with the given email (" + customer.getEmail()
								+ ") already exists!");
		}
	}

	/*
	 **************************************************************************************************************************
	 */

	/*
	 * VALIDATIONS FOR COMPANIES
	 */

	public void validateCompanyAdditionAllowed(Company company) throws CompanyAlreadyExistsException {

		// Validate company email is not taken
		if (companyRepository.existsByEmail(company.getEmail()))
			throw new CompanyAlreadyExistsException(
					"Company with the given email (" + company.getEmail() + ") already exists!");

		// Validate company name is not taken
		if (companyRepository.existsByName(company.getName())) {
			throw new CompanyAlreadyExistsException(
					"Company with the given name (" + company.getName() + ") already exists!");

		}
	}

	public void validateUpdateAllowed(Company company)
			throws UpdateNotAllowedException, CompanyAlreadyExistsException, CompanyNotExistsException {
		validateCompanyExists(company.getId());
		Company oldCompany = companyRepository.findById(company.getId()).get();
		// Validate company name hasn't changed
		if (!oldCompany.getName().equals(company.getName()))
			throw new UpdateNotAllowedException("Can't update the company because the name was changed");
		// Validate company email is still unique
		if (!oldCompany.getEmail().equals(company.getEmail())) {
			if (companyRepository.existsByEmail(company.getEmail()))
				throw new CompanyAlreadyExistsException("Can't update the because a company with the given email ("
						+ company.getEmail() + ") already exists!");
		}

	}

	public void validateCompanyExists(int id) throws CompanyNotExistsException {
		if (!companyRepository.existsById(id))
			throw new CompanyNotExistsException("Company with id (" + id + ") does not exist");
	}

	public void validateCompanyExists(String email, String password) throws CompanyNotExistsException {
		if (!companyRepository.existsByEmailAndPassword(email, password))
			throw new CompanyNotExistsException("Company with the given parameters (email: " + email + ", password: "
					+ password + ") does not exist!");

	}

	/*
	 **************************************************************************************************************************
	 */

	/*
	 * VALIDATIONS FOR COUPONS
	 */
	public void validateCouponTitleExist(String title, int companyId) throws CouponAlreadyExistsException {
		if (couponRepository.existsByTitleAndCompanyId(title, companyId))
			throw new CouponAlreadyExistsException(
					"Coupon with the title (" + title + ") already exists for the company!");

	}

	public void validateCouponExists(int couponId) throws couponNotExistsException {
		if (!couponRepository.existsById(couponId))
			throw new couponNotExistsException("Coupon with the given id (" + couponId + ") does not exist");
	}

	public void validateUpdateAllowed(Coupon coupon, int companyId)
			throws couponNotExistsException, CouponAlreadyExistsException, companyNotOwnsCouponException {
		validateCouponExists(coupon.getId());
		// Validate coupon belongs to current logged-in company
		if (coupon.getCompany().getId() != companyId)
			throw new companyNotOwnsCouponException("Can't update the coupon because it belongs to another company");
		Coupon oldCoupon = couponRepository.getById(coupon.getId());
		// Unless the title hasn't changed, Validate that coupon title doesn't match
		// with any of the company coupons
		if (!oldCoupon.getTitle().equals(coupon.getTitle()))
			validateCouponTitleExist(coupon.getTitle(), coupon.getCompany().getId());

	}

	public void validateDeleteAllowed(int couponId, int companyId)
			throws couponNotExistsException, companyNotOwnsCouponException {
		validateCouponExists(couponId);

		if (!couponRepository.existsByIdAndCompanyId(couponId, companyId))
			throw new companyNotOwnsCouponException("Can't delete the coupon because it belongs to another company");

	}

}
