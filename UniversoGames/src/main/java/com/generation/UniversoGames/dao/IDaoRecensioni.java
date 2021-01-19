package com.generation.UniversoGames.dao;

import java.util.List;

import com.generation.UniversoGames.model.Recensione;

public interface IDaoRecensioni {
	List<Recensione> recensioni();
	Recensione recensione(int id);
	void addRecensione(Recensione recensione);
	void deleteRecensione(int id);
	void updateRecensione(Recensione recensione);
}
