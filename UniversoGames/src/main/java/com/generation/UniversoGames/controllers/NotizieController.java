package com.generation.UniversoGames.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generation.UniversoGames.dao.IDaoNotizie;
import com.generation.UniversoGames.model.Notizia;

@RestController
@RequestMapping("/home")
public class NotizieController {
	@Autowired
	private IDaoNotizie dao;
	@GetMapping
	public List<Notizia> get() {
		return dao.notizie();
	}
	@GetMapping("/{id}")
	public Notizia get(@PathVariable int id) {
		return dao.notizia(id);
	}
}
