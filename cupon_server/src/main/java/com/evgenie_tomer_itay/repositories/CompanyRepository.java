package com.evgenie_tomer_itay.repositories;

import com.evgenie_tomer_itay.entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
  
    @Query(value = "SELECT * FROM companies WHERE email = :desiredEmail AND password = :desiredPassword", nativeQuery = true)
    Company getOneCompanyByEmailAndPassword(@Param("desiredEmail") String desiredEmail, @Param("desiredPassword") String desiredPassword);

    Company getByEmailAndPassword(String email, String password);
    @Query(value = "SELECT COUNT(*) FROM coupons WHERE id = :desiredId AND title = :desiredTitle", nativeQuery = true)
    Integer getCouponCountByTitle(@Param("desiredId") int desiredId, @Param("desiredTitle") String desiredTitle);
    
    boolean existsByEmail(String email);

    boolean existsByName(String name);

    boolean existsByEmailAndPassword(String email, String password);

    

}
