package com.generation.universogames.controllers;
import java.util.List;

import com.generation.universogames.dao.IDaoRecensioni;
import com.generation.universogames.model.Recensione;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recensioni")
public class RecensioniController {
	@Autowired
	private IDaoRecensioni dao;
	@GetMapping
	public List<Recensione> get() {
		return dao.recensioni();
	}
	@GetMapping("/{id}")
	public Recensione get(@PathVariable int id) {
		return dao.recensione(id);
	}
	@PostMapping
	public void post(@RequestBody Recensione recensione) {
		dao.addRecensione(recensione);
	}
	@DeleteMapping("/{id}")
	public void delete(@PathVariable int id) {
		dao.deleteRecensione(id);
	}
	@PutMapping
	public void put(@RequestBody Recensione recensione) {
		dao.updateRecensione(recensione);
	}
}