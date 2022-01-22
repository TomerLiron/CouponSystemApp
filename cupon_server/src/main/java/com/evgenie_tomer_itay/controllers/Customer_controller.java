package com.evgenie_tomer_itay.controllers;

import com.evgenie_tomer_itay.entities.Category;
import com.evgenie_tomer_itay.entities.Coupon;
import com.evgenie_tomer_itay.entities.Customer;
import com.evgenie_tomer_itay.exceptions.couponExceptions.couponExpiredException;
import com.evgenie_tomer_itay.exceptions.couponExceptions.couponNotExistsException;
import com.evgenie_tomer_itay.exceptions.couponExceptions.noCouponsLeftException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.CustomerAlreadyExistsException;
import com.evgenie_tomer_itay.exceptions.customerExceptions.couponAlreadyPurchasedException;
import com.evgenie_tomer_itay.services.CustomerServiceImplementation;
import com.evgenie_tomer_itay.utilities.Credentials;
import com.evgenie_tomer_itay.utilities.SimpleTokenManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/customer")
public class Customer_controller {
    @Autowired
    CustomerServiceImplementation customerService;
    @Autowired
    SimpleTokenManager simpleTokenManager;

    //Customer Login validations miss
    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody Credentials cred) {
        System.out.println(new Date() + ": Got a new login: " + cred);
        try {
            customerService.login(cred.getEmail(), cred.getPassword());
            String token = simpleTokenManager.getNewToken();
            return new ResponseEntity<String>(token, HttpStatus.OK);
        } catch (CustomerAlreadyExistsException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    //spring security,token
    @GetMapping("all/{token}")
    @ResponseBody
    public ResponseEntity<?> all(@PathVariable String token) {
        System.out.println("all");
        if (simpleTokenManager.isTokenExist(token)) {
            System.out.println("good");
            List<Coupon> coupons = customerService.getPurchasedCoupons();
            System.out.println("all " + coupons.size());
            ArrayList<Map<String, String>> Map = new ArrayList<Map<String, String>>();
            return new ResponseEntity<List<Coupon>>(coupons, HttpStatus.OK);
        }
        return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
    }//getCouponsByPrice

    @PostMapping("/getCouponsByPrice")
    public ResponseEntity<?> getCouponsByPrice(@RequestBody double price, @RequestHeader("token") String token) {
        System.out.println("price " + price + " token:" + token);
        if (simpleTokenManager.isTokenExist(token)) {
            System.out.println("good");
            List<Coupon> coupons = customerService.getCouponsByPrice(price);
            System.out.println("all " + coupons.size());
            ArrayList<Map<String, String>> Map = new ArrayList<Map<String, String>>();
            return new ResponseEntity<List<Coupon>>(coupons, HttpStatus.OK);
        }
        return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
    }

    //spring security,token
    @PostMapping("/getCouponsByCategory")
    public ResponseEntity<?> getCouponsByCategory(@RequestBody String category, @RequestHeader("token") String token) {
        Category sendCategory = Category.valueOf(category);
        System.out.println("Category " + sendCategory + " token:" + token);
        if (simpleTokenManager.isTokenExist(token)) {
            System.out.println("good");
            List<Coupon> coupons = customerService.getCouponsByCategory(Category.valueOf(category));
            System.out.println("all " + coupons.size());
            ArrayList<Map<String, String>> Map = new ArrayList<Map<String, String>>();
            return new ResponseEntity<List<Coupon>>(coupons, HttpStatus.OK);
        }
        return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
    }


    @PostMapping("/purchaseCoupon")
    public ResponseEntity<?> purchaseCoupon(@RequestBody int id, @RequestHeader("token") String token) {
        System.out.println("purchaseCoupon");
        if (simpleTokenManager.isTokenExist(token)) {
            System.out.println("good");
            try {

                customerService.purchaseCoupon(id);

                return new ResponseEntity<String>("OK", HttpStatus.OK);
            } catch (couponNotExistsException | noCouponsLeftException | couponAlreadyPurchasedException | couponExpiredException e) {
                System.out.println(e.getMessage());
//                String message=e.getMessage();
                return new ResponseEntity<String>(e.getMessage(), HttpStatus.ACCEPTED);
            }
        }
        return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/getCustomerDetails")
    public ResponseEntity<?> getCustomerDetails(@RequestHeader("token") String token) {
        System.out.println("purchaseCoupon");
        if (simpleTokenManager.isTokenExist(token)) {
            System.out.println("good");
            Customer customer=customerService.getCustomerDetails();
            return new ResponseEntity<Customer>(customer, HttpStatus.OK);
        }
        return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
    }
}