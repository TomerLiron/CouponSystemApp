package com.evgenie_tomer_itay.exceptions.couponExceptions;

import com.evgenie_tomer_itay.utilities.LoggerManager;
public class noCouponsLeftException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public noCouponsLeftException(String message) {
		super(message);
		LoggerManager.addLogWarnings(message);
	}
}
