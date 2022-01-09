
package com.evgenie_tomer_itay.services;


import com.evgenie_tomer_itay.exceptions.adminExceptions.AdminNotExistsException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.CustomerAlreadyExistsException;
import com.evgenie_tomer_itay.exceptions.companyExceptions.CompanyNotExistsException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.customerNotExistsException;

public abstract class ClientService {
	/**
	 * 
	 * @param email of either administrator/company/customer
	 * @param password of either administrator/company/customer
	 * @return true if the login details are correct
	 * @throws customerNotExistsException if the login details are not found in the Database
	 */
	public abstract void login(String email, String password) throws customerNotExistsException, CompanyNotExistsException, AdminNotExistsException, CustomerAlreadyExistsException;
}

