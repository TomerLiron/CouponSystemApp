package com.evgenie_tomer_itay.movies.exceptions.customerExceptions;

public class UpdateNotAllowedException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UpdateNotAllowedException(String message) {
		super(message);
	}
}
