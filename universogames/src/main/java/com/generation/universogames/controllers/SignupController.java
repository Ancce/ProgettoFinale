package com.generation.universogames.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.generation.universogames.auth.AuthService;

@RestController
@RequestMapping("/signup")
public class SignupController {
	@Autowired
	private AuthService authService;
	@PostMapping
	public String signup(@RequestParam String email, @RequestParam String username, @RequestParam String password) {
		if (authService.checkPassword(password)) {
			if (authService.checkEmail(email)) {
				if (!authService.mailPresente(email)) {
					authService.signup(email, username, password);
					return "Ok";
				}
				return "E-mail già esistente";
			}
			return "E-mail non valida. ";
		}
		return "La password deve contenere un numero, un carattere minuscolo, uno maiuscolo e un carattere speciale tra @#$% e deve avere lunghezza min 8 e max 20.";
	}
	
}
