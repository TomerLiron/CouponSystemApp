package com.evgenie_tomer_itay.controllers;


import com.evgenie_tomer_itay.entities.Company;
import com.evgenie_tomer_itay.entities.Coupon;
import com.evgenie_tomer_itay.entities.Customer;
import com.evgenie_tomer_itay.exceptions.adminExceptions.AdminNotExistsException;
import com.evgenie_tomer_itay.exceptions.companyExceptions.CompanyAlreadyExistsException;
import com.evgenie_tomer_itay.exceptions.companyExceptions.CompanyNotExistsException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.CustomerAlreadyExistsException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.UpdateNotAllowedException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.customerNotExistsException;
import com.evgenie_tomer_itay.services.AdminServiceImplementation;
import com.evgenie_tomer_itay.utilities.Credentials;
import com.evgenie_tomer_itay.utilities.SimpleTokenManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/admin")
public class Admin_controller {

    @Autowired
    AdminServiceImplementation adminService;
    @Autowired
    SimpleTokenManager simpleTokenManager;

    private final String ADMIN_EMAIL = "admin@admin.com";
    private final String ADMIN_PASSWORD = "admin";
//    private int companyId;


    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody Credentials cred) {
        System.out.println("admin login");
        System.out.println(new Date() + ": Got a new login: " + cred);
        try {
            adminService.login(cred.getEmail(), cred.getPassword());
            String token = simpleTokenManager.getNewToken();
            return new ResponseEntity<String>(token, HttpStatus.OK);
        } catch (AdminNotExistsException e) {
            return new ResponseEntity<String>("Login error!", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("getAllCompanies/{token}")
    @ResponseBody
    public ResponseEntity<?> getAllCompanies(@PathVariable String token) {
        System.out.println("getAllCompanies");
        if (simpleTokenManager.isTokenExist(token)) {
            System.out.println("good");
            List<Company> companies = adminService.getAllCompanies();
            System.out.println("all " + companies.size());
            ArrayList<Map<String, String>> Map = new ArrayList<Map<String, String>>();
            return new ResponseEntity<List<Company>>(companies, HttpStatus.OK);
        }
        return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/getOneCompany")
    public ResponseEntity<?> getOneCompany(@RequestBody int id, @RequestHeader("token") String token) {
        System.out.println("getAllCompanies");
        if (simpleTokenManager.isTokenExist(token)) {
            System.out.println("good");
            List<Company> companies = new ArrayList<>();
            try {
                companies.add(adminService.getOneCompany(id));
                System.out.println(1);
                System.out.println(companies);
                System.out.println(2);
                return new ResponseEntity<List<Company>>(companies, HttpStatus.OK);
            } catch (CompanyNotExistsException e) {
                System.out.println(e.getMessage());
                return new ResponseEntity<String>(e.getMessage(), HttpStatus.ACCEPTED);
            }
        }
        return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
    }


    @PostMapping("/addCompany")
    public ResponseEntity<?> addCompany(@RequestBody Company company, @RequestHeader("token") String token) {
        System.out.println("Name " + company + " token:" + token);
        if (simpleTokenManager.isTokenExist(token)) {
            try {
                adminService.addCompany(company);
                return new ResponseEntity<String>("ok", HttpStatus.OK);
            } catch (CompanyAlreadyExistsException e) {
                System.out.println(e.getMessage());
                return new ResponseEntity<String>(e.getMessage(), HttpStatus.ACCEPTED);
            }
        }
        return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/updateCompany")
    public ResponseEntity<?> updateCompany(@RequestBody Company company, @RequestHeader("token") String token) {
        System.out.println("update Name " + company + " token:" + token);
        if (simpleTokenManager.isTokenExist(token)) {
            System.out.println("enter");
            try {
                adminService.updateCompany(company);
                System.out.println("up");
                return new ResponseEntity<String>("ok", HttpStatus.OK);
            } catch (CompanyAlreadyExistsException | UpdateNotAllowedException | CompanyNotExistsException e) {
                System.out.println(e.getMessage());
                return new ResponseEntity<String>(e.getMessage(), HttpStatus.ACCEPTED);
            }
        }
        System.out.println("on" +
                "");
        return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/deleteCompany")
    public ResponseEntity<?> deleteCompany(@RequestBody int id, @RequestHeader("token") String token) {
        System.out.println("delete Name " + id + " token:" + token);
        if (simpleTokenManager.isTokenExist(token)) {
            System.out.println("enter");
            try {
                adminService.deleteCompany(id);
                System.out.println("up");
                return new ResponseEntity<String>("ok", HttpStatus.OK);
            } catch (CompanyNotExistsException e) {
                System.out.println(e.getMessage());
                return new ResponseEntity<String>(e.getMessage(), HttpStatus.ACCEPTED);
            }
        }
        System.out.println("on");
        return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("getAllCustomers/{token}")
    @ResponseBody
    public ResponseEntity<?> getAllCustomers(@PathVariable String token) {
        System.out.println("getAllCompanies");
        if (simpleTokenManager.isTokenExist(token)) {
            System.out.println("good");
            List<Customer> customers = adminService.getAllCustomers();
            System.out.println("all " + customers.size());
            System.out.println(customers);
            return new ResponseEntity<List<Customer>>(customers, HttpStatus.OK);
        }
        return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/addCustomer")
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer, @RequestHeader("token") String token) {
        System.out.println("Name " + customer + " token:" + token);
        if (simpleTokenManager.isTokenExist(token)) {
            try {
                System.out.println("G");
                adminService.addCustomer(customer);
                return new ResponseEntity<String>("ok", HttpStatus.OK);
            } catch (CustomerAlreadyExistsException e) {
                System.out.println(e.getMessage());
                return new ResponseEntity<String>(e.getMessage(), HttpStatus.ACCEPTED);
            }
        }
        return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/deleteCustomer")
    public ResponseEntity<?> deleteCustomer(@RequestBody int id, @RequestHeader("token") String token) {
        System.out.println("deleteCustomer Name " + id + " token:" + token);
        if (simpleTokenManager.isTokenExist(token)) {
            System.out.println("enter");
            try {
                adminService.deleteCustomer(id);
                System.out.println("up");
                return new ResponseEntity<String>("ok", HttpStatus.OK);
            } catch (customerNotExistsException e) {
                System.out.println(e.getMessage());
                return new ResponseEntity<String>(e.getMessage(), HttpStatus.ACCEPTED);
            }
        }
        System.out.println("on");
        return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/updateCustomer")
    public ResponseEntity<?> updateCustomer(@RequestBody Customer customer, @RequestHeader("token") String token) {
        System.out.println("update customer " + customer + " token:" + token);
        if (simpleTokenManager.isTokenExist(token)) {
            System.out.println("enter");
            try {
                adminService.updateCustomer(customer);
                System.out.println("up");
                return new ResponseEntity<String>("ok", HttpStatus.OK);
            } catch (CustomerAlreadyExistsException | customerNotExistsException e) {
                System.out.println(e.getMessage());
                return new ResponseEntity<String>(e.getMessage(), HttpStatus.ACCEPTED);
            }
        }
        return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/getOneCustomer")
    public ResponseEntity<?> getOneCustomer(@RequestBody int id, @RequestHeader("token") String token) {
        System.out.println("getAllCompanies");
        if (simpleTokenManager.isTokenExist(token)) {
            System.out.println("good");
            List<Customer> customers = new ArrayList<>();
            try {
                customers.add(adminService.getOneCustomer(id));
                System.out.println(1);
                System.out.println(customers);
                System.out.println(2);

                return new ResponseEntity<List<Customer>>(customers, HttpStatus.OK);
            } catch ( customerNotExistsException e) {
                System.out.println(e.getMessage());
                return new ResponseEntity<String>(e.getMessage(), HttpStatus.ACCEPTED);
            }
        }
        return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
    }



}





