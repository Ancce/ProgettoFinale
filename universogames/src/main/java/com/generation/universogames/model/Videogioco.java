package com.generation.universogames.model;

import java.util.List;

import com.generation.universogames.util.IMappable;

public class Videogioco implements IMappable{
    private int id;
    private String titolo, genere, piattaforma, editor;
    private String dataPubblicazione;
    private double punteggioMedio;
    private Notizia notizia;
    private List<Recensione> recensioni;
    private String immagine;

public Videogioco(int id, String titolo, String genere, String piattaforma, String editor, String dataPubblicazione,
		double punteggioMedio, Notizia notizia, List<Recensione> recensioni, String immagine) {
	super();
	this.id = id;
	this.titolo = titolo;
	this.genere = genere;
	this.piattaforma = piattaforma;
	this.editor = editor;
	this.dataPubblicazione = dataPubblicazione;
	this.punteggioMedio = punteggioMedio;
	this.notizia = notizia;
	this.recensioni = recensioni;
	this.immagine = immagine;
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

public String getDataPubblicazione() {
	return dataPubblicazione;
}

public void setDataPubblicazione(String dataPubblicazione) {
	this.dataPubblicazione = dataPubblicazione;
}

public double getPunteggioMedio() {
	return punteggioMedio;
}

public void setPunteggioMedio(double punteggioMedio) {
	this.punteggioMedio = punteggioMedio;
}

public Notizia getNotizia() {
	return notizia;
}

public void setNotizia(Notizia notizia) {
	this.notizia = notizia;
}

public List<Recensione> getRecensioni() {
	return recensioni;
}

public void setRecensioni(List<Recensione> recensioni) {
	this.recensioni = recensioni;
}

public String getImmagine() {
	return immagine;
}

public void setImmagine(String immagine) {
	this.immagine = immagine;
}


}
