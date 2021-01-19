package com.generation.UniversoGames.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.generation.UniversoGames.model.Recensione;
import com.generation.UniversoGames.util.BasicDao;
@Repository
public class DaoRecensioniMySQL extends BasicDao implements IDaoRecensioni{
	public DaoRecensioniMySQL(@Value("${db.address}")String dbAddress, @Value("${db.user}")String user, @Value("${db.psw}")String password) {
		super(dbAddress,user,password);
	}

	@Override
	public List<Recensione> recensioni() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Recensione recensione(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addRecensione(Recensione recensione) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteRecensione(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateRecensione(Recensione recensione) {
		// TODO Auto-generated method stub
		
	}
	
}
