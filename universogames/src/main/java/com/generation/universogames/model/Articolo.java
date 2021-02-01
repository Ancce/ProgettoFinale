package com.generation.universogames.model;

import com.generation.universogames.util.IMappable;

public abstract class Articolo implements IMappable{
    private int id;
    private String dataPubblicazione;
    private String contenuto;
    private String autore;
    private Videogioco videogioco;
    private String immagine;

    public Articolo(int id, String dataPubblicazione, String contenuto, String autore, Videogioco videogioco, String immagine) {
        super();
        this.id = id;
        this.dataPubblicazione = dataPubblicazione;
        this.contenuto = contenuto;
        this.autore = autore;
        this.videogioco = videogioco;
        this.immagine = immagine;
    }

    public Articolo() {
        super();
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getDataPubblicazione() {
        return dataPubblicazione;
    }
    public void setDataPubblicazione(String dataPubblicazione) {
        this.dataPubblicazione = dataPubblicazione;
    }
    public String getContenuto() {
        return contenuto;
    }
    public void setContenuto(String contenuto) {
        this.contenuto = contenuto;
    }
    public String getAutore() {
        return autore;
    }
    public void setAutore(String autore) {
        this.autore = autore;
    }

	public Videogioco getVideogioco() {
		return videogioco;
	}

	public void setVideogioco(Videogioco videogioco) {
		this.videogioco = videogioco;
	}

	public String getImmagine() {
		return immagine;
	}

	public void setImmagine(String immagine) {
		this.immagine = immagine;
	}
    
}
