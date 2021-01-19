package com.generation.UniversoGames.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.generation.UniversoGames.model.Notizia;
import com.generation.UniversoGames.model.Recensione;
import com.generation.UniversoGames.model.Videogioco;
import com.generation.UniversoGames.util.BasicDao;
import com.generation.UniversoGames.util.IMappable;

@Repository
public class DaoNotizieMySQL extends BasicDao implements IDaoNotizie{
	public DaoNotizieMySQL(@Value("${db.address}")String dbAddress, @Value("${db.user}")String user, @Value("${db.psw}")String password) {
		super(dbAddress,user,password);
	}

	@Override
	public List<Notizia> notizie() {
		List<Notizia> ris = new ArrayList<>();
		
		List<Map<String, String>> maps = getAll("SELECT * FROM notizie");
		
		for (Map<String, String> map : maps) {
			ris.add(IMappable.fromMap(Notizia.class, map));
		}
		
		return ris;
	}
	
	@Override
	public Notizia notizia(int id) {
		Notizia ris = null;
		
        Map<String, String> map = getOne("SELECT * FROM notizie WHERE id = ?", id);
		
		if (map!= null) {
			ris = IMappable.fromMap(Notizia.class, map);
		}
		
		List<Recensione> r = new ArrayList<>();
		List<Map<String, String>> maps = getAll("SELECT * FROM notizie INNER JOIN recensioni ON idnotizia = notizie.id ");
		
		for (Map<String, String> map2 : maps) {
			r.add(IMappable.fromMap(Recensione.class, map2));
		}
		
		ris.setRecensioni(r);
		return ris;
	}

	@Override
	public void addNotizia(Notizia notizia) {
		execute("INSERT INTO notizie (titolo, categoria, immagine, contenuto, datapubblicazione, autore) VALUES (?, ?, ?, ?, ?, ?)",
				notizia.getTitolo(),
				notizia.getCategoria(),
				notizia.getImmagine(),
				notizia.getContenuto(),
				notizia.getDataPubblicazione(),
				notizia.getAutore());
	}

	@Override
	public void deleteNotizia(int id) {
		execute("DELETE FROM notizie WHERE id = ?", id);
	}

	@Override
	public void updateNotizia(Notizia notizia) {
		execute("UPDATE notizie SET titolo = ?, categoria = ?, immagine = ?, contenuto = ?, datapubblicazione = ?, autore = ? ",
				notizia.getTitolo(),
				notizia.getCategoria(),
				notizia.getImmagine(),
				notizia.getContenuto(),
				notizia.getDataPubblicazione(),
				notizia.getAutore());
	}
	
}
