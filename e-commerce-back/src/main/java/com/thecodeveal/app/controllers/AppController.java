package com.thecodeveal.app.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class AppController {

	@GetMapping
	public String testApp() {
		return "Hello Spring Security!";
	}

}
