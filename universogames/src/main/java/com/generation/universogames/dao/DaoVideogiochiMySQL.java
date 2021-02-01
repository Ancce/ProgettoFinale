package com.generation.universogames.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.generation.universogames.model.Notizia;
import com.generation.universogames.model.Recensione;
import com.generation.universogames.model.Videogioco;
import com.generation.universogames.util.BasicDao;
import com.generation.universogames.util.IMappable;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository
public class DaoVideogiochiMySQL extends BasicDao implements IDaoVideogiochi{
	public DaoVideogiochiMySQL(@Value("${db.address}")String dbAddress, @Value("${db.user}")String user, @Value("${db.psw}")String password) {
		super(dbAddress,user,password);
	}

	@Override
	public List<Videogioco> videogiochi() {
		List<Videogioco> ris = new ArrayList<>();
		List<Map<String, String>> maps = getAll("SELECT * FROM videogiochi");
		for (Map<String, String> map : maps) {
			ris.add(IMappable.fromMap(Videogioco.class, map));
		}
		//Impostare le recensioni e il punteggio medio di tutti i videogiochi della lista
		for (Videogioco v: ris) {
			List<Recensione> ris2 = new ArrayList<>();
			double sommaPunteggio = 0;
			List<Map<String,String>> maps2 = getAll("SELECT * FROM videogiochi INNER JOIN recensioni ON videogiochi.id = recensioni.idvideogioco WHERE idvideogioco = ?",v.getId());
			for (Map<String,String> map2: maps2) {
				Recensione r = new Recensione();
				r.fromMap(map2);
				sommaPunteggio += r.getPunteggio();
				ris2.add(r);
			}
			v.setRecensioni(ris2);
			v.setPunteggioMedio(sommaPunteggio / ris2.size());
		}
		return ris;
	}

	@Override
	public Videogioco videogioco(int id) {
		Videogioco ris = null;
		Map<String, String> map = getOne("SELECT * FROM videogiochi WHERE id= ?", id);
		if(map != null) {
			ris = IMappable.fromMap(Videogioco.class, map);
		}
		//Impostazione della notizia
		Notizia notizia = null;
		Map<String,String> map2 = getOne("SELECT * FROM notizie WHERE id= ?", id);
		if (map2 != null) {
			notizia = new Notizia();
			notizia.fromMap(map2);
		}
		ris.setNotizia(notizia);
		//Impostazione delle recensioni
		List<Recensione> ris2 = new ArrayList<>();
		List<Map<String,String>> maps = getAll("SELECT * FROM videogiochi INNER JOIN recensioni ON videogiochi.id = recensioni.idvideogioco WHERE idvideogioco = ?",id);
		for (Map<String,String> map3: maps) {
			Recensione r = new Recensione();
			r.fromMap(map3);
			ris2.add(r);
		}
		ris.setRecensioni(ris2);
		//Impostare il punteggio medio del singolo videogioco
		double sommaPunteggi = 0;
		for (Recensione r: ris.getRecensioni()) {
			sommaPunteggi += r.getPunteggio();
		}
		ris.setPunteggioMedio(sommaPunteggi / ris.getRecensioni().size());
		return ris;
	}
	
	@Override
	public void addVideogioco(Videogioco videogioco) {
		execute("INSERT INTO videogiochi(id,titolo,genere,piattaforma,editor,datapubblicazione) VALUES (?,?,?,?,?,?)",
				videogioco.getNotizia().getId(),videogioco.getTitolo(),videogioco.getGenere(),videogioco.getPiattaforma(),videogioco.getEditor(),videogioco.getDataPubblicazione());
		
	}

	@Override
	public void deleteVideogioco(int id) {
		execute("DELETE FROM videogiochi WHERE id = ?",id);
		execute("DELETE FROM notizie WHERE id = ?",id);
	}

	@Override
	public void updateVideogioco(Videogioco videogioco) {
		execute("UPDATE videogiochi SET titolo=?, genere=?, piattaforma=?, editor=?, datapubblicazione=? WHERE id=?",
				videogioco.getTitolo(),videogioco.getGenere(),videogioco.getPiattaforma(),videogioco.getEditor(),videogioco.getDataPubblicazione(),videogioco.getId());
	}

	@Override
	public List<Videogioco> ricerca(String titolo) {
		List<Videogioco> ris = new ArrayList<>();
		List<Map<String,String>> maps = getAll("SELECT * FROM videogiochi WHERE titolo LIKE '%[TITOLO]%'".replace("[TITOLO]", titolo));
		for (Map<String,String> map: maps) {
			ris.add(IMappable.fromMap(Videogioco.class, map));
		}
		return ris;
	}
	
}
