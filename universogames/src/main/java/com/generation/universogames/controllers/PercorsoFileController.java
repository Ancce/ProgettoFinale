package com.generation.universogames.controllers;

import com.generation.universogames.model.PercorsoFile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/file")
public class PercorsoFileController {

	private PercorsoFile percorso;
	
	@Autowired
	public PercorsoFileController (PercorsoFile percorso) {
		this.percorso = percorso;
	}
	
	@PostMapping("/carica")
	public String caricaFile(@RequestParam MultipartFile file) {
		return percorso.salvaFile(file);
	}
	
	@GetMapping("/download/{nomeFile}")
	public Resource downloadFile(@PathVariable String nomeFile) {
		return percorso.loadFile(nomeFile);
	}
}