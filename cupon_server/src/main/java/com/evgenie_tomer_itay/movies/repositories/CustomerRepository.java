package com.evgenie_tomer_itay.movies.repositories;

import com.evgenie_tomer_itay.movies.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
	Boolean existsByEmailAndPassword(String email, String password);

	Customer findByEmailAndPassword(String email, String password);

	boolean existsByEmail(String email);
	

}