package com.generation.UniversoGames.model;

import java.time.LocalDate;

import com.generation.UniversoGames.util.IMappable;

public class Recensione extends Articolo implements IMappable{
	private float punteggio;
	private Notizia notizia;

	public Recensione(int id, LocalDate dataPubblicazione, String contenuto, String autore, Videogioco videogioco, float punteggio,
			Notizia notizia) {
		super(id, dataPubblicazione, contenuto, autore, videogioco);
		this.punteggio = punteggio;
		this.notizia = notizia;
	}
	
	public Recensione() {
		super();
	}
	
	public float getPunteggio() {
		return punteggio;
	}

	public void setPunteggio(float punteggio) {
		this.punteggio = punteggio;
	}

	public Notizia getNotizia() {
		return notizia;
	}

	public void setNotizia(Notizia notizia) {
		this.notizia = notizia;
	}
}
