package com.evgenie_tomer_itay.movies.exceptions.couponExceptions;

public class noCouponsLeftException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public noCouponsLeftException(String message) {
		super(message);
	}
}
