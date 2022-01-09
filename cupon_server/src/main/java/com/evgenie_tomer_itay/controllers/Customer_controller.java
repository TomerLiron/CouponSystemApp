package com.evgenie_tomer_itay.controllers;

import com.evgenie_tomer_itay.exceptions.couponExceptions.customerExceptions.CustomerAlreadyExistsException;
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
    public ResponseEntity<?> login(@RequestBody Credentials cred)
    {
        System.out.println(new Date()+": Got a new login: "+cred);
        try {
            customerService.login(cred.getEmail(), cred.getPassword());
            String token = simpleTokenManager.getNewToken();
            return new ResponseEntity<String>(token, HttpStatus.OK);
        }  catch (CustomerAlreadyExistsException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
/*
    @GetMapping("login")
    @ResponseBody
    public ArrayList<Map<String, String>> login(@RequestParam String email, @RequestParam String password) {
        System.out.println(email);
        ArrayList<Map<String, String>> map = new ArrayList<Map<String, String>>();
        Map<String, String> m = new HashMap<String, String>();
        if (customerRepository.existsByEmailAndPassword(email, password)) {
            customerId = customerRepository.findByEmailAndPassword(email, password).getId();
            m.put("isLoggedIn", "true");
            System.out.println("login " + customerId);
            map.add(m);
            return map;

        }

        else {
            m.put("isLoggedIn", "false");
            map.add(m);
            return map;
        }
    }*/

/* //spring security,token
    @GetMapping("all")
    public ArrayList<Map<String, String>> getAllCoupons() {
        List<Coupon> coupons = couponRepository.findByCustomerId(customerId);
        System.out.println("all " + coupons.size());
        ArrayList<Map<String, String>> Map = new ArrayList<Map<String, String>>();
        //@RequestParam String category,@RequestParam String title,@RequestParam String description, @RequestParam int amount,
        //@RequestParam String startDate, @RequestParam String endDate,@RequestParam double price,@RequestParam String image
        for (int i = 0; i < coupons.size(); i++) {
            Map<String, String> m = new HashMap<String, String>();
            m.put("id", "" + coupons.get(i).getId());
            m.put("company", "" + coupons.get(i).getCompany().getId());
            m.put("category", "" + coupons.get(i).getCategory());
            m.put("title", coupons.get(i).getTitle());
            m.put("description", coupons.get(i).getDescription());
            m.put("amount", "" + coupons.get(i).getAmount());
            m.put("startDate", "" + coupons.get(i).getStartDate());
            m.put("endDate", "" + coupons.get(i).getEndDate());
            m.put("price", "" + coupons.get(i).getPrice());
            m.put("image", coupons.get(i).getImage());
            Map.add(m);
        }
        return Map;
    }*/
  /*
    @GetMapping("add")
    @ResponseBody
    public ArrayList<Map<String, String>> addCoupon(@RequestParam String category, @RequestParam String title, @RequestParam String description, @RequestParam int amount,
                                                    @RequestParam String startDate, @RequestParam String endDate, @RequestParam double price, @RequestParam String image) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDate localStartDate = LocalDate.parse(startDate, formatter);
        LocalDate localEndDate = LocalDate.parse(endDate, formatter);

        Coupon coupon = Coupon.builder().category(Category.valueOf(category)).title(title).description(description).startDate(localStartDate)
                .endDate(localEndDate).amount(amount).company(companyRepository.getById(companyId)).price(price).image(image).build();
        ArrayList<Map<String, String>> map = new ArrayList<Map<String, String>>();
        Map<String, String> m = new HashMap<String, String>();
        try {
            validations.validateCouponTitleExist(coupon.getTitle(), companyId);
        } catch (CouponAlreadyExistsException e) {
            System.err.println(e.getMessage());
            m.put("ans", "false");
            map.add(m);
            return map;
        }
        Company company = companyRepository.findById(companyId).get();
        company.addToCoupons(coupon);
        companyRepository.save(company);
        System.out.println("add "+coupon.toString());
        m.put("ans", "true");
        map.add(m);
        return map;
    }


    @GetMapping("delete")
    @ResponseBody
    public ArrayList<Map<String, String>> deleteCoupon(@RequestParam int id) {

        System.out.println("delete "+"id:" + id);

        ArrayList<Map<String, String>> map = new ArrayList<Map<String, String>>();
        Map<String, String> m = new HashMap<String, String>();
        try {
            validations.validateDeleteAllowed(id, companyId);
        } catch (couponNotExistsException | companyNotOwnsCouponException e) {
            System.err.println(e.getMessage());
            m.put("ans", "false");
            map.add(m);
            return map;
        }
        Company company = companyRepository.getById(companyId);
        Coupon coupon = couponRepository.findById(id).get();

        company.removeCoupon(coupon);
        companyRepository.save(company);
        couponRepository.delete(coupon);
        m.put("ans", "true");
        map.add(m);
        return map;
    }
*/
}