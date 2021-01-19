package com.generation.UniversoGames.model;

import java.sql.Blob;
import java.time.LocalDate;
import java.util.List;

import com.generation.UniversoGames.util.IMappable;

public class Notizia extends Articolo implements IMappable{
	private String titolo;
	private String categoria;
	private Blob immagine;
	private List<Recensione> recensioni;

	public Notizia(int id, LocalDate dataPubblicazione, String contenuto, String autore, Videogioco videogioco, String titolo,
			String categoria, Blob immagine, List<Recensione> recensioni) {
		super(id, dataPubblicazione, contenuto, autore, videogioco);
		this.titolo = titolo;
		this.categoria = categoria;
		this.immagine = immagine;
		this.recensioni = recensioni;
	}
	
	public Notizia() {
		super();
	}
	
	public String getTitolo() {
		return titolo;
	}

	public void setTitolo(String titolo) {
		this.titolo = titolo;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	
	public Blob getImmagine() {
		return immagine;
	}

	public void setImmagine(Blob immagine) {
		this.immagine = immagine;
	}

	public List<Recensione> getRecensioni() {
		return recensioni;
	}

	public void setRecensioni(List<Recensione> recensioni) {
		this.recensioni = recensioni;
	}
}
