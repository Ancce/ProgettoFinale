package com.generation.universogames.controllers;

import java.util.List;

import com.generation.universogames.dao.IDaoNotizie;
import com.generation.universogames.model.Notizia;

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
@RequestMapping("/notizie")
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
	@PostMapping
	public void post(@RequestBody Notizia notizia) {
		//if (daoAdmin.login(admin.getUsername(), admin.getPassword()) != null) {
			dao.addNotizia(notizia);
		//}
	}
	@DeleteMapping("/{id}")
	public void delete(@PathVariable int id) {
		dao.deleteNotizia(id);
	}
	@PutMapping
	public void put(@RequestBody Notizia notizia) {
		dao.updateNotizia(notizia);
	}
}
