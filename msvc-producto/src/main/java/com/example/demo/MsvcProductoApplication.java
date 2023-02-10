package com.example.demo;

import org.apache.catalina.filters.CorsFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication

public class MsvcProductoApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsvcProductoApplication.class, args);
	}


}
