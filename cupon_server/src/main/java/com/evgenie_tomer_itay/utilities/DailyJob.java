package com.evgenie_tomer_itay.utilities;

import com.evgenie_tomer_itay.repositories.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

@Service
@Transactional
public class DailyJob 
{
	@Autowired
	private CouponRepository couponRepository;
	
	@PostConstruct
	@Scheduled(fixedDelayString = "${dailyJobInterval}",initialDelayString = "${initialDelayInterval}") // interval time is defined in the properties file	public void deleteExpiredCoupons()
	public void deleteExpiredCoupons() 
	{
		try
		{
			couponRepository.deleteExpiredCoupons();
			System.out.println("Expired coupons successfully deleted");
		
			LoggerManager.addLogInfo("Expired coupons successfully deleted");
		}
		
		catch(Exception e)
		{
			LoggerManager.addLogErrors("Failed to delete expired coupons!");
		}
	}

}

/*
@Service
@Transactional
public class DailyJob {
	@Autowired
	private CouponRepository couponRepository;
	@PostConstruct
	@Scheduled(fixedDelayString = "${dailyJobInterval}",initialDelayString = "${initialDelayInterval}") // interval time is defined in the properties file	public void deleteExpiredCoupons()
	public void deleteExpiredCoupons() {
		couponRepository.deleteExpiredCoupons();
		System.out.println("Expired Coupons deleted successfully");
	}

}
*/
