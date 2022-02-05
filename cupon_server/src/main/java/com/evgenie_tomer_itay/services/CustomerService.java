
package com.evgenie_tomer_itay.services;


import com.evgenie_tomer_itay.entities.Category;
import com.evgenie_tomer_itay.entities.Coupon;
import com.evgenie_tomer_itay.entities.Customer;
import com.evgenie_tomer_itay.exceptions.customerExceptions.CustomerAlreadyExistsException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.couponAlreadyPurchasedException;
import com.evgenie_tomer_itay.exceptions.companyExceptions.CompanyNotExistsException;
import com.evgenie_tomer_itay.exceptions.couponExceptions.couponExpiredException;
import com.evgenie_tomer_itay.exceptions.couponExceptions.couponNotExistsException;
import com.evgenie_tomer_itay.exceptions.couponExceptions.noCouponsLeftException;
import com.evgenie_tomer_itay.utilities.Validations;

import java.util.List;

public interface CustomerService {
	/**
	 * @param email    String object that represents the customer's email address.
	 * @param password String object that represents the customer's password.
	 * @return true if the login is successful (email and password match with a
	 *         customer in the Database) A custom exception will be thrown from the
	 *         Validations class if the login details are incorrect.
	 * @throws CompanyNotExistsException/ CustomerAlreadyExistsException        
	 * @see Validations Class for more details
	 */
	public void login(String email, String password) throws CompanyNotExistsException, CustomerAlreadyExistsException;

	/**
	 * @param couponId ID of a coupon from the database. A custom exception will be
	 *                 thrown from the Validations class in the following cases:
	 *                 -coupon doesn't exist
	 *                 -coupon was already purchased
	 *                 -coupon is unavailable (amount is zero) 
	 *                 -coupon has expired
	 * 
	 * @throws couponNotExistsException/ noCouponsLeftException/ couponAlreadyPurchasedException/ couponExpiredException
	 * @see Validations Class for more details
	 * 
	 */
	public void purchaseCoupon(int couponId) throws couponNotExistsException, noCouponsLeftException, couponAlreadyPurchasedException, couponExpiredException;
	/**
	 * @param category 
	 * @return all coupons by category form the Database 
	 */
	public List<Coupon> getCouponsByCategory(Category category);
	/**
	 * @return all the coupons that the customer owns
	 */
	public List<Coupon> getPurchasedCoupons();
	/**
	 * 
	 * @param price
	 * @return all coupons from the Database that cost less than the given price
	 */
	public List<Coupon> getCouponsByPrice(double price);
	/**
	 * @return a Customer Object of the customer that is currently logged in
	 */
	public Customer getCustomerDetails();

}
