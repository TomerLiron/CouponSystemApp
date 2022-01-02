package com.evgenie_tomer_itay.movies.controllers;

import com.evgenie_tomer_itay.movies.entities.Category;
import com.evgenie_tomer_itay.movies.entities.Company;
import com.evgenie_tomer_itay.movies.entities.Coupon;
import com.evgenie_tomer_itay.movies.entities.Validations;

import com.evgenie_tomer_itay.movies.exceptions.companyExceptions.CompanyNotExistsException;
import com.evgenie_tomer_itay.movies.exceptions.companyExceptions.companyNotOwnsCouponException;
import com.evgenie_tomer_itay.movies.exceptions.couponExceptions.CouponAlreadyExistsException;
import com.evgenie_tomer_itay.movies.exceptions.couponExceptions.couponNotExistsException;
import com.evgenie_tomer_itay.movies.repositories.CompanyRepository;
import com.evgenie_tomer_itay.movies.repositories.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/company")
public class Company_controller {
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private CouponRepository couponRepository;
    @Autowired
    Validations validations;

    private int companyId;

    //spring security,token
    @GetMapping("all")
    public ArrayList<Map<String, String>> getAllCoupons() {
        List<Coupon> coupons = couponRepository.findByCompanyId(companyId);
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

    @GetMapping("login")
    @ResponseBody
    public ArrayList<Map<String, String>> login(@RequestParam String email, @RequestParam String password) {
        ArrayList<Map<String, String>> map = new ArrayList<Map<String, String>>();
        Map<String, String> m = new HashMap<String, String>();
        try {
            validations.validateCompanyExists(email, password);
        } catch (CompanyNotExistsException e) {
            System.err.println(e.getMessage());
            m.put("ans", "false");
            map.add(m);
            return map;
        }
        m.put("id", "true");
        companyId = companyRepository.getOneCompanyByEmailAndPassword(email, password).getId();
        System.out.println("login "+companyId);
        map.add(m);
        return map;
    }

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

}





