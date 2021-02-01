package com.generation.universogames.controllers;

import java.util.List;

import com.generation.universogames.dao.IDaoVideogiochi;
import com.generation.universogames.model.Videogioco;

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
@RequestMapping("/videogiochi")
public class VideogiochiController {
	@Autowired
	private IDaoVideogiochi dao;
	@GetMapping
	public List<Videogioco> get() {
		return dao.videogiochi();
	}
	@GetMapping("/{titolo}/1")
	public List<Videogioco> get(@PathVariable String titolo) {
		return dao.ricerca(titolo);
	}
	@GetMapping("/{id}")
	public Videogioco get(@PathVariable int id) {
		return dao.videogioco(id);
	}
	@PostMapping
	public void post(@RequestBody Videogioco videogioco) {
		dao.addVideogioco(videogioco);
	}
	@DeleteMapping("/{id}")
	public void delete(@PathVariable int id) {
		dao.deleteVideogioco(id);
	}
	@PutMapping
	public void put(@RequestBody Videogioco videogioco) {
		dao.updateVideogioco(videogioco);
	}
}