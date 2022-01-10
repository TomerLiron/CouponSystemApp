
package com.evgenie_tomer_itay.services;

import com.evgenie_tomer_itay.entities.Category;
import com.evgenie_tomer_itay.entities.Company;
import com.evgenie_tomer_itay.entities.Coupon;
import com.evgenie_tomer_itay.exceptions.companyExceptions.CompanyNotExistsException;
import com.evgenie_tomer_itay.exceptions.companyExceptions.companyNotOwnsCouponException;
import com.evgenie_tomer_itay.exceptions.couponExceptions.CouponAlreadyExistsException;
import com.evgenie_tomer_itay.exceptions.couponExceptions.couponNotExistsException;
import com.evgenie_tomer_itay.utilities.Validations;
import java.util.List;

public interface CompanyService {
	/**
	 * @param email    String object that represents the company's email address.
	 * @param password String object that represents the company's password.
	 * @throws CompanyNotExistsException
	 * @see Validations Class for more details
	 */
	public void login(String email, String password) throws CompanyNotExistsException;

	/**
	 * @param coupon A Coupon Object. A custom exception will be thrown from the
	 *               Validations class if the coupon title already exists within the
	 *               company that is currently logged in.
	 * @throws CouponAlreadyExistsException
	 * @see Validations Class for more details
	 */
	public void addCoupon(Coupon coupon) throws CouponAlreadyExistsException;

	/**
	 * @param coupon A Coupon Object from the Database. A custom exception will be
	 *               thrown from the Validations class if the coupon ID or the
	 *               company ID is changed.
	 * @throws couponNotExistsException/ CouponAlreadyExistsException/
	 *                                   companyNotOwnsCouponException
	 * @see Validations Class for more details
	 */
	public void updateCoupon(Coupon coupon)
			throws couponNotExistsException, CouponAlreadyExistsException, companyNotOwnsCouponException;

	/**
	 * @param couponId coupon id that exists in the database A custom exception will
	 *                 be thrown from the Validations class if the coupon id doesn't
	 *                 exist.
	 * @throws couponNotExistsException/ companyNotOwnsCouponException
	 * @see Validations Class for more details
	 */
	public void deleteCoupon(int couponId) throws couponNotExistsException, companyNotOwnsCouponException;

	/**
	 * @return all coupons from the Database.
	 */
	public List<Coupon> getAllCoupons();

	/**
	 * @param category
	 * @return all coupons by category form the Database
	 */
	public List<Coupon> getCouponsByCategory(Category category);

	/**
	 * 
	 * @param maxPrice
	 * @return all coupons from the Database that cost less than the given max price
	 */
	public List<Coupon> getCouponsByMaximumPrice(int maxPrice);

	/**
	 * @return Company Object of the company that is currently logged in
	 */
	public Company companyDetails();

}
