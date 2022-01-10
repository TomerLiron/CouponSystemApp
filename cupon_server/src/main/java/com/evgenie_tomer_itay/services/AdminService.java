package com.evgenie_tomer_itay.services;

import com.evgenie_tomer_itay.entities.Company;
import com.evgenie_tomer_itay.entities.Customer;
import com.evgenie_tomer_itay.exceptions.adminExceptions.AdminNotExistsException;
import com.evgenie_tomer_itay.exceptions.companyExceptions.CompanyAlreadyExistsException;
import com.evgenie_tomer_itay.exceptions.companyExceptions.CompanyNotExistsException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.CustomerAlreadyExistsException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.UpdateNotAllowedException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.customerNotExistsException;
import com.evgenie_tomer_itay.repositories.CompanyRepository;
import com.evgenie_tomer_itay.repositories.CustomerRepository;
import com.evgenie_tomer_itay.utilities.Validations;

import java.util.List;

public interface AdminService {
	public void login(String email, String password) throws AdminNotExistsException;

	/**
	 * @param company A Company Object. A custom exception will be thrown from the
	 *                Validations class if a company name or email already exists.
	 * @throws AdminNotExistsException
	 * @see Validations Class for more details
	 */
	public void addCompany(Company company) throws CompanyAlreadyExistsException;

	/**
	 * @param company A Company Object from the Database. A custom exception will be
	 *                thrown from the Validations class if the company ID or the
	 *                company name is changed.
	 * @throws CompanyAlreadyExistsException
	 * @see Validations Class for more details
	 */
	public void updateCompany(Company company)
			throws UpdateNotAllowedException, CompanyAlreadyExistsException, CompanyNotExistsException;

	/**
	 * @param id company id that exists in the database A custom exception will be
	 *           thrown from the Validations class if company id doesn't exist.
	 * @throws UpdateNotAllowedException/CompanyAlreadyExistsException/CompanyNotExistsException
	 * @see Validations Class for more details
	 */
	public void deleteCompany(int id) throws CompanyNotExistsException;

	/**
	 * @throws CompanyNotExistsException if a company with the given id does not
	 *                                   exist
	 * @return List of all companies in the Database
	 * 
	 * 
	 */
	public List<Company> getAllCompanies();

	/**
	 * @param id company id that exists in the database
	 * @return Company Object with the given id from the Database A custom exception
	 *         will be thrown from the Validations class if company id doesn't
	 *         exist.
	 * @throws CompanyNotExistsException
	 * @see Validations Class for more details
	 */
	public Company getOneCompany(int id) throws CompanyNotExistsException;

	/**
	 * @param customer A Customer Object. A custom exception will be thrown from the
	 *                 Validations class if a customer email already exists.
	 * @throws CustomerAlreadyExistsException
	 * @see Validations Class for more details
	 */
	public void addCustomer(Customer customer) throws CustomerAlreadyExistsException;

	/**
	 * @param customer A Customer Object from the Database. A custom exception will
	 *                 be thrown from the Validations class if the customer ID is
	 *                 changed.
	 * @see Validations Class for more details
	 */
	public void updateCustomer(Customer customer) throws CustomerAlreadyExistsException, customerNotExistsException;

	/**
	 * @param id customer id that exists in the database A custom exception will be
	 *           thrown from the Validations class if customer id doesn't exist.
	 * @throws CustomerAlreadyExistsException/ customerNotExistsException
	 * @see Validations Class for more details
	 */
	public void deleteCustomer(int id) throws customerNotExistsException;

	/**
	 * @throws customerNotExistsException if customer with the given id does not
	 *                                    exist
	 * @return List of all customers in the Database.
	 */
	public List<Customer> getAllCustomers();

	/**
	 * @param id customer id that exists in the database
	 * @return Customer Object with the given id from the Database A custom
	 *         exception will be thrown from the Validations class if customer id
	 *         doesn't exist.
	 * @throws customerNotExistsException if A customer with the given id does not
	 *                                    exist
	 */
	public Customer getOneCustomer(int id) throws customerNotExistsException;

	public void setCompanyRepository(CompanyRepository companyRepository);

	public void setCustomerRepository(CustomerRepository customerRepository);
}
