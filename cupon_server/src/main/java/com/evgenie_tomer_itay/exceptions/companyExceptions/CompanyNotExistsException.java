package com.evgenie_tomer_itay.exceptions.companyExceptions;

import com.evgenie_tomer_itay.utilities.LoggerManager;

public class CompanyNotExistsException extends Exception
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public CompanyNotExistsException(String message)
	{
		super(message);
		LoggerManager.addLogWarnings(message);
	}	
}
