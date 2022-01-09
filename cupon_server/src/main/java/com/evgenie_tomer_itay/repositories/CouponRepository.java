package com.evgenie_tomer_itay.repositories;


import com.evgenie_tomer_itay.entities.Coupon;
import jdk.jfr.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
@Repository
public interface CouponRepository extends JpaRepository<Coupon, Integer> {
	/*
	 * General findBy queries for coupons
	 */
	@Query("SELECT c FROM Coupon c WHERE c.amount > 0")
	List<Coupon> findAllAvailableCoupons();

	List<Coupon> findByCategoryIs(Category category);

	List<Coupon> findByTitle(String title);

	List<Coupon> findByPriceBetween(int price1, int price2);

	List<Coupon> findByEndDateBetween(LocalDate date1, LocalDate date2);

	List<Coupon> findByStartDateBetween(LocalDate date1, LocalDate date2);
	
	boolean existsByTitle(String title);

	@Modifying
	@Transactional
	@Query("DELETE FROM Coupon c WHERE c.endDate < CURRENT_DATE")
	void deleteExpiredCoupons();

	/*
	 * for company coupons
	 */
	
	@Query("SELECT c FROM Coupon c WHERE c.company.id = :companyId")
	List<Coupon> findByCompanyId(int companyId);

	@Query("SELECT c FROM Coupon c WHERE c.company.id = :companyId AND c.id = :couponId")
    Coupon getOneCompanyCoupon(int companyId, int couponId);

	@Query("SELECT c FROM Coupon c WHERE c.company.id = :companyId AND c.category = :category")
	List<Coupon> findCompanyCouponsByCategory(int companyId, Category category);

	@Query("SELECT c FROM Coupon c WHERE c.company.id = :companyId AND c.price<= :price")
	List<Coupon> findCompanyCouponsByPrice(int companyId, double price);

	boolean existsByTitleAndCompanyId(String title, int companyId);

	boolean existsByIdAndCompanyId(int couponId, int companyId);

	/*
	 * for customer coupons
	 */

	@Query("SELECT coupon FROM Customer c JOIN c.coupons coupon WHERE c.id = :customerId")
	List<Coupon> findByCustomerId(int customerId);

	@Query("SELECT coupon FROM Customer c JOIN c.coupons coupon WHERE c.id = :customerId AND coupon.id = :couponId")
    Coupon getOneCustomerCoupon(int customerId, int couponId);
	
	@Query("SELECT coupon FROM Customer c JOIN c.coupons coupon WHERE c.id = :customerId AND coupon.category = :category")
	List<Coupon>findCustomerCouponsByCategory(int customerId, Category category);
	
	@Query("SELECT coupon FROM Customer c JOIN c.coupons coupon WHERE c.id = :customerId AND coupon.price <= :price")
	List<Coupon>findCustomerCouponsByPrice(int customerId, double price);




	
	

}
