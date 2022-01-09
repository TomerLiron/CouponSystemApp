package com.evgenie_tomer_itay.exceptions.couponExceptions.customerExceptions;


import com.evgenie_tomer_itay.utilities.LoggerManager;

public class couponAlreadyPurchasedException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public couponAlreadyPurchasedException(String message) {
		super(message);
		LoggerManager.addLogWarnings(message);
	}
}
