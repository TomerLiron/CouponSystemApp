package com.evgenie_tomer_itay.services;

import com.evgenie_tomer_itay.entities.Company;
import com.evgenie_tomer_itay.entities.Customer;
import com.evgenie_tomer_itay.exceptions.adminExceptions.AdminNotExistsException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.CustomerAlreadyExistsException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.UpdateNotAllowedException;
import com.evgenie_tomer_itay.exceptions.companyExceptions.CompanyAlreadyExistsException;
import com.evgenie_tomer_itay.exceptions.companyExceptions.CompanyNotExistsException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.customerNotExistsException;
import com.evgenie_tomer_itay.repositories.CompanyRepository;
import com.evgenie_tomer_itay.repositories.CustomerRepository;
import com.evgenie_tomer_itay.utilities.Validations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Scope("prototype")
public class AdminServiceImplementation extends ClientService implements AdminService {
	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	Validations validations;
	private final String ADMIN_EMAIL = "admin@admin.com";
	private final String ADMIN_PASSWORD = "admin";

	@Override
	public void login(String email, String password) throws AdminNotExistsException {

		if ((email.equals(ADMIN_EMAIL)) && (password.equals(ADMIN_PASSWORD)))
			return ;

		throw new AdminNotExistsException("Company with the given parameters (email: " + email + ", password: "
				+ password + ") does not exist!");
	}

	@Override
	public void addCompany(Company company) {

		try {
			validations.validateCompanyAdditionAllowed(company);
		} catch (CompanyAlreadyExistsException e) {
			return;
		}
		company.setPassword(company.getPassword());

		companyRepository.save(company);

	}

	@Override
	public void updateCompany(Company newCompany) {

		try {
			validations.validateUpdateAllowed(newCompany);
		} catch (UpdateNotAllowedException | CompanyAlreadyExistsException | CompanyNotExistsException e) {
			return;
		}
		newCompany.setPassword(newCompany.getPassword());
		companyRepository.save(newCompany);

	}

	@Override
	public void deleteCompany(int id) {

		try {
			validations.validateCompanyExists(id);
		} catch (CompanyNotExistsException e) {
			return;
		}
		Company company = getOneCompany(id);
		company.clearCoupons();
		companyRepository.deleteById(id);

	}

	@Override
	public List<Company> getAllCompanies() {
		return companyRepository.findAll();

	}

	@Override

	public Company getOneCompany(int id) {
		try {
			validations.validateCompanyExists(id);
		} catch (CompanyNotExistsException e) {
			return null;
		}
		return companyRepository.findById(id).get();

	}

	@Override
	public void addCustomer(Customer customer) {

		try {
			validations.validateCustomerExists(customer.getEmail());
		} catch (CustomerAlreadyExistsException e) {
			return;
		}
		customer.setPassword(customer.getPassword());

		customerRepository.save(customer);
	}

	@Override

	public void updateCustomer(Customer newCustomer) {

		try {
			validations.validateUpdateAllowed(newCustomer);
		} catch (CustomerAlreadyExistsException | customerNotExistsException e) {
			return;
		}
		newCustomer.setPassword(newCustomer.getPassword());
		customerRepository.save(newCustomer);

	}

	@Override

	public void deleteCustomer(int id) {

		try {
			validations.validateCustomerExists(id);
		} catch (customerNotExistsException e) {
			return;
		}
		customerRepository.deleteById(id);
	}

	@Override
	public Customer getOneCustomer(int id) {
		try {
			validations.validateCustomerExists(id);
		} catch (customerNotExistsException e) {
			return null;
		}
		return customerRepository.getById(id);

	}

	@Override
	public List<Customer> getAllCustomers() {

		return customerRepository.findAll();
	}

	@Override
	public void setCompanyRepository(CompanyRepository companyRepository) 
	{
		this.companyRepository = companyRepository;
	}

	@Override
	public void setCustomerRepository(CustomerRepository customerRepository)
	{
		this.customerRepository = customerRepository;
	}
}
