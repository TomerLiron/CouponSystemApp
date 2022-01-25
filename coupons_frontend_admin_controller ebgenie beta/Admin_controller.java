package com.evgenie_tomer_itay.controllers;


import com.evgenie_tomer_itay.entities.Company;
import com.evgenie_tomer_itay.entities.Customer;
import com.evgenie_tomer_itay.exceptions.adminExceptions.AdminNotExistsException;
import com.evgenie_tomer_itay.services.AdminServiceImplementation;
import com.evgenie_tomer_itay.utilities.Credentials;
import com.evgenie_tomer_itay.utilities.ObjectToJson;
import com.evgenie_tomer_itay.utilities.SimpleTokenManager;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/admin")

/**
 * I think class name should be changed to: AdminController
 */

public class Admin_controller 
{
    @Autowired
    AdminServiceImplementation adminService;
    @Autowired
    SimpleTokenManager simpleTokenManager;

    private final String ADMIN_EMAIL = "admin@admin.com";
    private final String ADMIN_PASSWORD = "admin";    
    
    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody Credentials cred)  
    {
        System.out.println(new Date()+": Got a new login: "+cred);
        try
        {
            adminService.login(cred.getEmail(), cred.getPassword());
            String token = simpleTokenManager.getNewToken();
            return new ResponseEntity<String>(token, HttpStatus.OK);
        } 
        
        catch (AdminNotExistsException e) 
        {
            return new ResponseEntity<String>("Login error!", HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping("companies")
    public ResponseEntity<?> getAllCompanies() 
    {
    	try
    	{
    		ObjectMapper mapper = new ObjectMapper();
    		List<Company> companies= adminService.getAllCompanies();
    	 
    		String json = ObjectToJson.toJson(companies);
    		
    		return new ResponseEntity<String>(json, HttpStatus.OK);
    	}
    	
    	catch(Exception e)
    	{
    		return new ResponseEntity<String>("Unexpected error!", HttpStatus.NO_CONTENT);
    	}    	
    }
    
    @CrossOrigin(origins = "http://localhost:3001")
    @PostMapping("companies")
    public ResponseEntity<?> addCompany(@RequestBody Company company)
    {
    	System.out.println(company);

    	try
    	{
    		adminService.addCompany(company);
    		return new ResponseEntity<String>("Added company: "+company.getName(), HttpStatus.OK);
    	}
    	
    	catch(Exception e)
    	{
    		return new ResponseEntity<String>("Failed to add company", HttpStatus.BAD_REQUEST);
    	}
    }
    
    @CrossOrigin(origins = "http://localhost:3001")
    @PutMapping("/companies/{id}")
    public ResponseEntity<?> updateCompany(@RequestBody Company newCompany, @PathVariable int id)
    {    	
    	Company company = adminService.getOneCompany(id);
    	
		company.setName(newCompany.getName());
		company.setEmail(newCompany.getEmail());
		company.setPassword(newCompany.getPassword());
		
		adminService.updateCompany(company);
		
		return new ResponseEntity<String>("Updated company: "+company.getName(), HttpStatus.OK);

    }

    
    @CrossOrigin(origins = "http://localhost:3001")
    @DeleteMapping(value = "/companies/{id}")
    public ResponseEntity<?> deleteCompany(@PathVariable int id)
    {
    	try
    	{
    		adminService.deleteCompany(id);
    		
    		return new ResponseEntity<String>("Company was deleted successfully", HttpStatus.OK);
    	}
    	
    	catch(Exception e)
    	{
    		return new ResponseEntity<String>("Failed to delete company", HttpStatus.BAD_REQUEST);
    	}
    }
    
    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping("companies/{id}")
    public ResponseEntity<?> getOneCompany(int id) throws JsonProcessingException
    {
    	try
    	{
    		Company company =  adminService.getOneCompany(id);

    		String json = ObjectToJson.toJson(company);
    		
    		return new ResponseEntity<String>(json, HttpStatus.OK);
    	}
    	
    	catch(Exception e)
    	{
    		return new ResponseEntity<String>("Failed to find company with provided id: "+id, HttpStatus.BAD_REQUEST);
    	} 
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @PostMapping("customers")
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer)
    {
    	try
    	{
    		adminService.addCustomer(customer);
    		return new ResponseEntity<String>("Added customer: "+customer.getFirstName()+" "+customer.getLastName(), HttpStatus.OK);
    	}
    	
    	catch(Exception e)
    	{
    		return new ResponseEntity<String>("Failed to add customer", HttpStatus.BAD_REQUEST);
    	}
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @PutMapping("/customers/{id}")
    public ResponseEntity<?> updateCustomer(@RequestBody Customer newCustomer, @PathVariable int id)
    {
    	try
    	{
    		Customer customer = adminService.getOneCustomer(id);
        	
    		customer.setFirstName(newCustomer.getFirstName());
    		customer.setLastName(newCustomer.getLastName());
    		customer.setEmail(newCustomer.getEmail());
    		customer.setPassword(newCustomer.getPassword());
    		
    		adminService.updateCustomer(customer);
    		
    		return new ResponseEntity<String>("Updated customer: "+customer.getFirstName()+" "+customer.getLastName(), HttpStatus.OK);
    	}
    	
    	catch(Exception e)
    	{
    		return new ResponseEntity<String>("Failed to update customer", HttpStatus.BAD_REQUEST);
    	}
    }
    
    @CrossOrigin(origins = "http://localhost:3001")
    @DeleteMapping(value = "/customers/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable int id)
    {
    	try
    	{
    		adminService.deleteCustomer(id);
    		
    		return new ResponseEntity<String>("Customer was deleted successfully", HttpStatus.OK);
    	}
    	
    	catch(Exception e)
    	{
    		return new ResponseEntity<String>("Failed to delete customer", HttpStatus.BAD_REQUEST);
    	}
    }
    
    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping("customers/{id}")
    public ResponseEntity<?> getOneCustomer(int id) throws JsonProcessingException
    {
    	try
    	{
    		Customer customer =  adminService.getOneCustomer(id);

    		String json = ObjectToJson.toJson(customer);
    		
    		return new ResponseEntity<String>(json, HttpStatus.OK);
    	}
    	
    	catch(Exception e)
    	{
    		return new ResponseEntity<String>("Failed to find company with provided id: "+id, HttpStatus.BAD_REQUEST);
    	} 
    }


    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping("customers")
    public ResponseEntity<?> getAllCustomers() 
    {
    	try
    	{
    		ObjectMapper mapper = new ObjectMapper();
    		List<Customer> customers= adminService.getAllCustomers();
    	 
    		String json = ObjectToJson.toJson(customers);
    		
    		return new ResponseEntity<String>(json, HttpStatus.OK);
    	}
    	
    	catch(Exception e)
    	{
    		return new ResponseEntity<String>("Unexpected error!", HttpStatus.NO_CONTENT);
    	}    	
    }
}

