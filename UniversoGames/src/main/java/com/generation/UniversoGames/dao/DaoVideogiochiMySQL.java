package com.generation.UniversoGames.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.generation.UniversoGames.model.Videogioco;
import com.generation.UniversoGames.util.BasicDao;

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
			Videogioco v = new Videogioco();
			v.fromMap(map);
			ris.add(v);
		}
		return ris;
	}

	@Override
	public Videogioco videogioco(int id) {
		Videogioco ris = null;
		
		Map<String, String> map = getOne("SELECT * FROM videogiochi WHERE id= ?", id);
		
		if(map != null) {
			ris = new Videogioco();
			ris.fromMap(map);
		}
		return ris;
	}

	@Override
	public void addVideogioco(Videogioco videogioco) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteVideogioco(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateVideogioco(Videogioco videogioco) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Videogioco> ricerca(String titolo) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
