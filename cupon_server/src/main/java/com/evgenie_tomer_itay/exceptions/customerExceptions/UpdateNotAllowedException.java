package com.evgenie_tomer_itay.exceptions.customerExceptions;

import com.evgenie_tomer_itay.utilities.LoggerManager;

public class UpdateNotAllowedException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UpdateNotAllowedException(String message) {
		super(message);
		LoggerManager.addLogWarnings(message);
	}
}
