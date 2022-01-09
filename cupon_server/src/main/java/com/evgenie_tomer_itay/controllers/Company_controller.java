package com.evgenie_tomer_itay.controllers;


import com.evgenie_tomer_itay.entities.Coupon;
import com.evgenie_tomer_itay.exceptions.couponExceptions.customerExceptions.companyExceptions.CompanyNotExistsException;
import com.evgenie_tomer_itay.services.CompanyServiceImplementation;
import com.evgenie_tomer_itay.utilities.Credentials;
import com.evgenie_tomer_itay.utilities.SimpleTokenManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/company")
public class Company_controller {

    @Autowired
    CompanyServiceImplementation companyService;
    @Autowired
    SimpleTokenManager simpleTokenManager;


    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody Credentials cred) {
        System.out.println(new Date() + ": Got a new login: " + cred);
        try {
            companyService.login(cred.getEmail(), cred.getPassword());
            String token = simpleTokenManager.getNewToken();
            return new ResponseEntity<String>(token, HttpStatus.OK);
        } catch (CompanyNotExistsException e) {
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
            List<Coupon> coupons = companyService.getAllCoupons();
            ArrayList<Map<String, String>> couponsList = new ArrayList<Map<String, String>>();
            for (int i = 0; i < coupons.size(); i++) {
                Map<String, String> map = new HashMap<String, String>();
                map.put("id", "" + coupons.get(i).getId());
                map.put("company", "" + coupons.get(i).getCompany().getId());
                map.put("category", "" + coupons.get(i).getCategory());
                map.put("title", coupons.get(i).getTitle());
                map.put("description", coupons.get(i).getDescription());
                map.put("amount", "" + coupons.get(i).getAmount());
                map.put("startDate", "" + coupons.get(i).getStartDate());
                map.put("endDate", "" + coupons.get(i).getEndDate());
                map.put("price", "" + coupons.get(i).getPrice());
                map.put("image", coupons.get(i).getImage());
                couponsList.add(map);
            }
            return new ResponseEntity<ArrayList<Map<String, String>>>(couponsList, HttpStatus.OK);
        }
        return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);

    }
}
 /*       System.out.println("all " + coupons.size());
        //@RequestParam String category,@RequestParam String title,@RequestParam String description, @RequestParam int amount,
        //@RequestParam String startDate, @RequestParam String endDate,@RequestParam double price,@RequestParam String image


    /*

    @PostMapping("/addCoupon")
    ResponseEntity<?> addCoupon(@RequestBody Coupon coupon, @RequestHeader("token") String token) {

        if (simpleTokenManager.isTokenExist(token)) {
            try {
                validations.validateCouponTitleExist(coupon.getTitle(), companyId);
            } catch (CouponAlreadyExistsException e) {
                System.err.println(e.getMessage());

            }
            Company company = companyRepository.findById(companyId).get();
            company.addToCoupons(coupon);
            companyRepository.save(company);
            System.out.println("add "+coupon.toString());

            Integer id = coupon.getId();
            System.out.println("Got a new coupon: "+coupon+", token="+token);
            return new ResponseEntity<Integer>(id, HttpStatus.OK);
        }
        else {
            System.out.println("Got a new coupon: not" );

            return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
        }
//        }
//        System.out.println("Got a new coupon: "+coupon);
//        return new ResponseEntity<String>("No Session!", HttpStatus.BAD_REQUEST);
    }




    @GetMapping("delete")
    @ResponseBody
    public ArrayList<Map<String, String>> deleteCoupon(@RequestParam int id) {

        System.out.println("delete " + "id:" + id);

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







