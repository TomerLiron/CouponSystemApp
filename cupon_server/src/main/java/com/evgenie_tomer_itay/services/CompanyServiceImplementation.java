package com.evgenie_tomer_itay.services;

import com.evgenie_tomer_itay.entities.Category;
import com.evgenie_tomer_itay.entities.Company;
import com.evgenie_tomer_itay.entities.Coupon;
import com.evgenie_tomer_itay.exceptions.companyExceptions.NullFieldsException;
import com.evgenie_tomer_itay.exceptions.couponExceptions.CouponAlreadyExistsException;
import com.evgenie_tomer_itay.exceptions.couponExceptions.couponNotExistsException;
import com.evgenie_tomer_itay.exceptions.companyExceptions.CompanyNotExistsException;
import com.evgenie_tomer_itay.exceptions.companyExceptions.companyNotOwnsCouponException;
import com.evgenie_tomer_itay.repositories.CompanyRepository;
import com.evgenie_tomer_itay.repositories.CouponRepository;
import com.evgenie_tomer_itay.utilities.Validations;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Scope("prototype")
public class CompanyServiceImplementation extends ClientService implements CompanyService {
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private CouponRepository couponRepository;
	@Autowired
	Validations validations;

	@Getter
	private int companyId = -1;

	@Override

	public void login(String email, String password) throws CompanyNotExistsException {
		validations.validateCompanyExists(email, password);
		companyId = companyRepository.getOneCompanyByEmailAndPassword(email, password).getId();

	}

	@Override

	public void addCoupon(Coupon coupon) throws CouponAlreadyExistsException, NullFieldsException {

		validations.validateCouponTitleExist(coupon.getTitle(), companyId);
		validations.validateFieldsNotEmpty(coupon);
		Company company = companyRepository.findById(companyId).get();
		company.addToCoupons(coupon);
		companyRepository.save(company);
	}

	@Override

	public void updateCoupon(Coupon coupon)
			throws couponNotExistsException, CouponAlreadyExistsException, companyNotOwnsCouponException, NullFieldsException {

		validations.validateUpdateAllowed(coupon, companyId);
		validations.validateFieldsNotEmpty(coupon);
		couponRepository.save(coupon);
	}

	@Override

	public void deleteCoupon(int couponId) throws couponNotExistsException, companyNotOwnsCouponException {

		Company company = companyRepository.findById(companyId).get();

		validations.validateDeleteAllowed(couponId, companyId);

		Coupon coupon = couponRepository.findById(couponId).get();

		company.removeCoupon(coupon);
		companyRepository.save(company);
		couponRepository.delete(coupon);

	}

	@Override

	public List<Coupon> getAllCoupons() {
		return couponRepository.findByCompanyId(companyId);
	}

	@Override

	public List<Coupon> getCouponsByCategory(Category category) {
		return couponRepository.findCompanyCouponsByCategory(companyId, category);
	}

	@Override

	public List<Coupon> getCouponsByMaximumPrice(int maxPrice) {
		return couponRepository.findCompanyCouponsByPrice(companyId, maxPrice);
	}

	@Override

	public Company companyDetails() {

		return companyRepository.findById(companyId).get();
	}

}
