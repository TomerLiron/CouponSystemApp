package com.evgenie_tomer_itay.exceptions.couponExceptions.adminExceptions;


import com.evgenie_tomer_itay.utilities.LoggerManager;

public class AdminNotExistsException extends Exception
{

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	public AdminNotExistsException(String message)
	{
		super(message);
		LoggerManager.addLogWarnings(message);
	}	
}
