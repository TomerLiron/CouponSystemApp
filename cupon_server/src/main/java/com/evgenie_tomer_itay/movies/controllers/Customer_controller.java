package com.evgenie_tomer_itay.movies.controllers;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;


import com.evgenie_tomer_itay.movies.entities.Coupon;
import com.evgenie_tomer_itay.movies.entities.Validations;
import com.evgenie_tomer_itay.movies.repositories.CompanyRepository;
import com.evgenie_tomer_itay.movies.repositories.CouponRepository;
import com.evgenie_tomer_itay.movies.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
public class Customer_controller {
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private CouponRepository couponRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    Validations validations;

    private int customerId;


//Customer Login validations miss
    @GetMapping("login")
    @ResponseBody
    public ArrayList<Map<String, String>> login(@RequestParam String email, @RequestParam String password) {
        System.out.println(email);
        ArrayList<Map<String, String>> map = new ArrayList<Map<String, String>>();
        Map<String, String> m = new HashMap<String, String>();
        if (customerRepository.existsByEmailAndPassword(email, password)) {
            customerId = customerRepository.findByEmailAndPassword(email, password).getId();
            m.put("id", "true");
            System.out.println("login " + customerId);
            map.add(m);
            return map;

        }

        else {
            m.put("ans", "false");
            map.add(m);
            return map;
        }
//        try {
//            validations.validateCompanyExists(email, password);
//        } catch (CompanyNotExistsException e) {
//            System.err.println(e.getMessage());
//            m.put("ans", "false");
//            map.add(m);
//            return map;
//        }
//        m.put("id", "true");
//        companyId = companyRepository.getOneCompanyByEmailAndPassword(email, password).getId();
//        System.out.println("login "+companyId);
//        map.add(m);
    }

 //spring security,token
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
    }
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





