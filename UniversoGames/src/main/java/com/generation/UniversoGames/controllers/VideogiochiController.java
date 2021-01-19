package com.generation.UniversoGames.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generation.UniversoGames.dao.IDaoVideogiochi;
import com.generation.UniversoGames.model.Videogioco;

@RestController
@RequestMapping("/videogiochi")
public class VideogiochiController {
	@Autowired
	private IDaoVideogiochi dao;
	@GetMapping
	public List<Videogioco> get() {
		return dao.videogiochi();
	}
	@GetMapping("/{id}")
	public Videogioco get(@PathVariable int id) {
		return dao.videogioco(id);
	}
}
