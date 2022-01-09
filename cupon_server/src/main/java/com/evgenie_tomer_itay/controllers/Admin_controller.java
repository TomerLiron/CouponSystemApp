package com.evgenie_tomer_itay.controllers;


import com.evgenie_tomer_itay.entities.Company;
import com.evgenie_tomer_itay.exceptions.couponExceptions.adminExceptions.AdminNotExistsException;
import com.evgenie_tomer_itay.repositories.CompanyRepository;
import com.evgenie_tomer_itay.repositories.CouponRepository;
import com.evgenie_tomer_itay.services.AdminServiceImplementation;
import com.evgenie_tomer_itay.utilities.Credentials;
import com.evgenie_tomer_itay.utilities.SimpleTokenManager;
import com.evgenie_tomer_itay.utilities.Validations;
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
    public ResponseEntity<?> login(@RequestBody Credentials cred)  {
        System.out.println(new Date()+": Got a new login: "+cred);
        try {
            adminService.login(cred.getEmail(), cred.getPassword());
            String token = simpleTokenManager.getNewToken();
            return new ResponseEntity<String>(token, HttpStatus.OK);
        } catch (AdminNotExistsException e) {
            return new ResponseEntity<String>("Login error!", HttpStatus.BAD_REQUEST);
        }
    }


    //spring security,token
/*    @GetMapping("all")
    public ArrayList<Map<String, String>> getAllCompany() {

        List<Company> companies= companyRepository.findAll();
        System.out.println("all " + companies.size());
        ArrayList<Map<String, String>> Map = new ArrayList<Map<String, String>>();
        //@RequestParam String category,@RequestParam String title,@RequestParam String description, @RequestParam int amount,
        //@RequestParam String startDate, @RequestParam String endDate,@RequestParam double price,@RequestParam String image

        for (int i = 0; i < companies.size(); i++) {
            Map<String, String> m = new HashMap<String, String>();
            m.put("id", "" + companies.get(i).getId());
            m.put("name",  companies.get(i).getName());
            m.put("email", companies.get(i).getEmail());
            m.put("password", companies.get(i).getPassword());
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
    }*/

}





