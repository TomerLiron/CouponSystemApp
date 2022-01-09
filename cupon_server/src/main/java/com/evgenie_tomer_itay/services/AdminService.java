package com.evgenie_tomer_itay.services;


import com.evgenie_tomer_itay.entities.Company;
import com.evgenie_tomer_itay.entities.Customer;
import com.evgenie_tomer_itay.exceptions.adminExceptions.AdminNotExistsException;
import com.evgenie_tomer_itay.repositories.CompanyRepository;
import com.evgenie_tomer_itay.repositories.CustomerRepository;
import com.evgenie_tomer_itay.utilities.Validations;

import java.util.List;

public interface AdminService {
	public void login(String email, String password) throws AdminNotExistsException;

	/**
	 * @param company A Company Object. A custom exception will be thrown from the
	 *                Validations class if a company name or email already exists.
	 * @see Validations Class for more details
	 */
	public void addCompany(Company company);

	/**
	 * @param company A Company Object from the Database. A custom exception will be
	 *                thrown from the Validations class if the company ID or the
	 *                company name is changed.
	 * @see Validations Class for more details
	 */
	public void updateCompany(Company company);

	/**
	 * @param id company id that exists in the database A custom exception will be
	 *           thrown from the Validations class if company id doesn't exist.
	 * @see Validations Class for more details
	 */
	public void deleteCompany(int id);

	/**
	 * @return List of all companies in the Database
	 */
	public List<Company> getAllCompanies();

	/**
	 * @param id company id that exists in the database
	 * @return Company Object with the given id from the Database A custom exception
	 *         will be thrown from the Validations class if company id doesn't exist.
	 * @see Validations Class for more details
	 */
	public Company getOneCompany(int id);

	/**
	 * @param customer A Customer Object. A custom exception will be thrown from the
	 *                 Validations class if a customer email already exists.
	 * @see Validations Class for more details
	 */
	public void addCustomer(Customer customer);

	/**
	 * @param customer A Customer Object from the Database. A custom exception will
	 *                 be thrown from the Validations class if the customer ID is
	 *                 changed.
	 * @see Validations Class for more details
	 */
	public void updateCustomer(Customer customer);

	/**
	 * @param id customer id that exists in the database A custom exception will be
	 *           thrown from the Validations class if customer id doesn't exist.
	 * @see Validations Class for more details
	 */
	public void deleteCustomer(int id);

	/**
	 * 
	 * @return List of all customers in the Database.
	 */
	public List<Customer> getAllCustomers();

	/**
	 * @param id customer id that exists in the database
	 * @return Customer Object with the given id from the Database A custom
	 *         exception will be thrown from the Validations class if customer id
	 *         doesn't exist.
	 * @see Validations Class for more details
	 */
	public Customer getOneCustomer(int id);

	public void setCompanyRepository(CompanyRepository companyRepository);

	public void setCustomerRepository(CustomerRepository customerRepository);
}
