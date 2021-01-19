package com.generation.UniversoGames.model;

import java.time.LocalDate;

import com.generation.UniversoGames.util.IMappable;

public abstract class Articolo implements IMappable{
	private int id;
    private LocalDate dataPubblicazione;
    private String contenuto;
    private String autore;
    private Videogioco videogioco;

    public Articolo(int id, LocalDate dataPubblicazione, String contenuto, String autore, Videogioco videogioco) {
        super();
        this.id = id;
        this.dataPubblicazione = dataPubblicazione;
        this.contenuto = contenuto;
        this.autore = autore;
        this.videogioco = videogioco;
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
    public LocalDate getDataPubblicazione() {
        return dataPubblicazione;
    }
    public void setDataPubblicazione(LocalDate dataPubblicazione) {
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
}
