package com.generation.universogames.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


import com.generation.universogames.model.Recensione;
import com.generation.universogames.model.Videogioco;
import com.generation.universogames.util.BasicDao;
import com.generation.universogames.util.IMappable;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository
public class DaoRecensioniMySQL extends BasicDao implements IDaoRecensioni {
	public DaoRecensioniMySQL(@Value("${db.address}")String dbAddress, @Value("${db.user}")String user, @Value("${db.psw}")String password) {
		super(dbAddress,user,password);
	}

	@Override
	public List<Recensione> recensioni() {
		List<Recensione> ris = new ArrayList<>();
		
		List<Map<String, String>> maps = getAll("SELECT * FROM recensioni");
		
		for (Map<String, String> map : maps) {
			ris.add(IMappable.fromMap(Recensione.class, map));
		}
		
		return ris;
	}

	@Override
	public Recensione recensione(int id) {
		Recensione ris = null;
		
		Map<String, String> map = getOne("SELECT * FROM recensioni WHERE id = ?", id);
		
		if (map!= null) {
			ris = IMappable.fromMap(Recensione.class, map);
		}
		Map<String, String> map2 = getOne("SELECT * FROM videogiochi WHERE id = ?", map.get("idvideogioco"));
		
		ris.setVideogioco(IMappable.fromMap(Videogioco.class, map2));
		
		return ris;
	}

	@Override
	public void addRecensione(Recensione recensione) {
		execute("INSERT INTO recensioni (datapubblicazione,contenuto,punteggio,autore,idvideogioco) VALUES (?,?,?,?,?)", 
				recensione.getDataPubblicazione(),recensione.getContenuto(),recensione.getPunteggio(),recensione.getAutore(),recensione.getVideogioco().getId());
	}

	@Override
	public void deleteRecensione(int id) {
		execute("DELETE FROM recensioni WHERE id = ?",id);
	}

	@Override
	public void updateRecensione(Recensione recensione) {
		execute("UPDATE recensioni SET datapubblicazione=?, contenuto=?, punteggio=?, autore=?, idvideogioco=? WHERE id=?",
				recensione.getDataPubblicazione(),recensione.getContenuto(),recensione.getPunteggio(),recensione.getAutore(),recensione.getVideogioco().getId(),recensione.getId());
	}
	
}
