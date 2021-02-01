package com.generation.universogames.model;

public class Recensione extends Articolo {


	private double punteggio;

	public Recensione(int id, String dataPubblicazione, String contenuto, String autore, Videogioco videogioco, String immagine, float punteggio) {
		super(id, dataPubblicazione, contenuto, autore, videogioco, immagine);
		this.punteggio = punteggio;
	}
	
	public Recensione() {
		super();
	}
	
	public double getPunteggio() {
		return punteggio;
	}

	public void setPunteggio(double punteggio) {
		this.punteggio = punteggio;
	}
}
