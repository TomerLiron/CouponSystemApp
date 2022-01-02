package com.evgenie_tomer_itay.movies.exceptions.customerExceptions;

public class couponAlreadyPurchasedException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public couponAlreadyPurchasedException(String message) {
		super(message);
	}
}
