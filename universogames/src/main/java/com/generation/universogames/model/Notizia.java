package com.generation.universogames.model;

public class Notizia extends Articolo {
	private String titolo;
	private String categoria;

	public Notizia(int id, String dataPubblicazione, String contenuto, String autore, Videogioco videogioco, String immagine, String titolo,
			String categoria, int idAdmin) {
		super(id, dataPubblicazione, contenuto, autore, videogioco, immagine);
		this.titolo = titolo;
		this.categoria = categoria;
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
}
