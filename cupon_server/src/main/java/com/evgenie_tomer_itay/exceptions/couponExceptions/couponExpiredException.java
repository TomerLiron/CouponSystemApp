package com.evgenie_tomer_itay.exceptions.couponExceptions;

import com.evgenie_tomer_itay.utilities.LoggerManager;

public class couponExpiredException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public couponExpiredException(String message) {
		super(message);
		LoggerManager.addLogWarnings(message);
	}
}
