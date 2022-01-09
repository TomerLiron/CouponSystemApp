package com.evgenie_tomer_itay.exceptions.couponExceptions.customerExceptions.companyExceptions;

import com.evgenie_tomer_itay.utilities.LoggerManager;

public class companyNotOwnsCouponException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	

	public companyNotOwnsCouponException(String message) 
	{
		super(message);		
		LoggerManager.addLogWarnings(message);
	}
	
}
