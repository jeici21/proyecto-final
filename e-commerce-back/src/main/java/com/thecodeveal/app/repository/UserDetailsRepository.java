package com.thecodeveal.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thecodeveal.app.entities.User;


public interface UserDetailsRepository extends JpaRepository<User, Long> {

	User findByUserName(String userName);
	
}
