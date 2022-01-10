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

/*  
    @GetMapping("login")
    @ResponseBody
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password)     
    {
    	System.out.println("Login");
    	
    	try 
    	{    		
			adminService.login(email, password);
			
			// String token = simpleTokenManager.getNewToken();
			
			return new ResponseEntity<String>("Logged correctly as Admin", HttpStatus.OK);
			
			// return new ResponseEntity<String>(token, HttpStatus.OK);
		} 
    	
    	catch (AdminNotExistsException e) 
    	{
    		
			e.printStackTrace();
			return new ResponseEntity<String>("Log in as Admin failed", HttpStatus.BAD_REQUEST);
		}
    }
    */
    
    
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

    
    @GetMapping("getAllCompanies")
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
    
    @PostMapping("addCompany")
    public ResponseEntity<?> addCompany(@RequestParam String name, @RequestParam String email, @RequestParam String password)
    {
    	Company newCompany = new Company();
    	
    	newCompany.setName(name);
    	newCompany.setEmail(email);
    	newCompany.setPassword(password);
    	
    	try
    	{
    		adminService.addCompany(newCompany);
    		return new ResponseEntity<String>("Added company: "+newCompany.getName(), HttpStatus.OK);
    	}
    	
    	catch(Exception e)
    	{
    		return new ResponseEntity<String>("Failed to add company", HttpStatus.BAD_REQUEST);
    	}
    }

    @PutMapping("updateCompany")
    public ResponseEntity<?> updateCompany(@RequestParam int id, @RequestParam String name, @RequestParam String email, @RequestParam String password)
    {
    	try
    	{
    		Company company = adminService.getOneCompany(id);
    		
    		company.setName(name);
    		company.setEmail(email);
    		company.setPassword(password);
    		
    		adminService.updateCompany(company);
    		
    		return new ResponseEntity<String>("Updated company: "+company.getName(), HttpStatus.OK);
    	}
    	
    	catch(Exception e)
    	{
    		return new ResponseEntity<String>("Failed to update company", HttpStatus.BAD_REQUEST);
    	}
    }
    
    @DeleteMapping("deleteCompany")
    public ResponseEntity<?> deleteCompany(@RequestParam int id)
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
    
    @GetMapping("getOneCompany")
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

    @PostMapping("addCustomer")
    public ResponseEntity<?> addCustomer(@RequestParam String firstName,@RequestParam String lastName ,@RequestParam String email, @RequestParam String password)
    {
    	Customer newCustomer = new Customer();
    	
    	newCustomer.setFirstName(firstName);
    	newCustomer.setLastName(lastName);
    	newCustomer.setEmail(email);
    	newCustomer.setPassword(password);
    	
    	try
    	{
    		adminService.addCustomer(newCustomer);
    		return new ResponseEntity<String>("Added customer: "+newCustomer.getFirstName()+" "+newCustomer.getLastName(), HttpStatus.OK);
    	}
    	
    	catch(Exception e)
    	{
    		return new ResponseEntity<String>("Failed to add customer", HttpStatus.BAD_REQUEST);
    	}
    }

    @PutMapping("updateCustomer")
    public ResponseEntity<?> updateCustomer(@RequestParam int id,@RequestParam String firstName,@RequestParam String lastName ,@RequestParam String email, @RequestParam String password)
    {
    	try
    	{
        	Customer customer = adminService.getOneCustomer(id);
        	
        	customer.setFirstName(firstName);
        	customer.setLastName(lastName);
        	customer.setEmail(email);
        	customer.setPassword(password);
    		
    		adminService.updateCustomer(customer);
    		
    		return new ResponseEntity<String>("Updated company: "+customer.getFirstName()+" "+customer.getLastName(), HttpStatus.OK);
    	}
    	
    	catch(Exception e)
    	{
    		return new ResponseEntity<String>("Failed to update customer", HttpStatus.BAD_REQUEST);
    	}
    }
    
    @DeleteMapping("deleteCustomer")
    public ResponseEntity<?> deleteCustomer(@RequestParam int id)
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
    
    @GetMapping("getOneCustomer")
    public ResponseEntity<?> getOneCustomer(int id) throws JsonProcessingException
    {
    	try
    	{    	
    		Customer customer =  adminService.getOneCustomer(id);

    		Customer newCustomer = new Customer();
    		newCustomer.setId(customer.getId());
    		newCustomer.setFirstName(customer.getFirstName());
    		newCustomer.setLastName(customer.getLastName());
    		newCustomer.setEmail(customer.getEmail());
    		newCustomer.setPassword(customer.getPassword());
    		
    		String json = ObjectToJson.toJson(newCustomer);

    		return new ResponseEntity<String>(json, HttpStatus.OK);
    	}
    	
    	catch(Exception e)
    	{
    		return new ResponseEntity<String>("Failed to find customer with provided id: "+id, HttpStatus.BAD_REQUEST);
    	} 
    }

    @GetMapping("getAllCustomers")
    public ResponseEntity<?> getAllCustomers() 
    {
    	try
    	{
    		List<Customer> customers = adminService.getAllCustomers();
    	 
    		String json = ObjectToJson.toJson(customers);
    		
    		return new ResponseEntity<String>(json, HttpStatus.OK);
    	}
    	
    	catch(Exception e)
    	{
    		return new ResponseEntity<String>("Unexpected error!", HttpStatus.NO_CONTENT);
    	}    	
    }
}





