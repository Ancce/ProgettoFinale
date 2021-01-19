package com.generation.UniversoGames.model;

import java.time.LocalDate;

import com.generation.UniversoGames.util.IMappable;

public class Videogioco implements IMappable{
	private int id;
    private String titolo, genere, piattaforma, editor;
    private LocalDate dataPubblicazione;
    private Notizia notizia;

    public Videogioco(int id, String titolo, String genere, String piattaforma, String editor,
            LocalDate dataPubblicazione, Notizia notizia) {
        super();
        this.id = id;
        this.titolo = titolo;
        this.genere = genere;
        this.piattaforma = piattaforma;
        this.editor = editor;
        this.dataPubblicazione = dataPubblicazione;
        this.notizia = notizia;
    }

    public Videogioco() {
    	super();
    }
    
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getTitolo() {
        return titolo;
    }
    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }
    public String getGenere() {
        return genere;
    }
    public void setGenere(String genere) {
        this.genere = genere;
    }
    public String getPiattaforma() {
        return piattaforma;
    }
    public void setPiattaforma(String piattaforma) {
        this.piattaforma = piattaforma;
    }
    public String getEditor() {
        return editor;
    }
    public void setEditor(String editor) {
        this.editor = editor;
    }
    public LocalDate getDataPubblicazione() {
        return dataPubblicazione;
    }
    public void setDataPubblicazione(LocalDate dataPubblicazione) {
        this.dataPubblicazione = dataPubblicazione;
    }
    public Notizia getNotizia() {
        return notizia;
    }
    public void setNotizia(Notizia notizia) {
        this.notizia = notizia;
    }
}
