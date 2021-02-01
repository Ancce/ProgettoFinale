package com.generation.universogames.dao;

import java.util.List;

import com.generation.universogames.model.Videogioco;

public interface IDaoVideogiochi {
	List<Videogioco> videogiochi();
	Videogioco videogioco(int id);
	void addVideogioco(Videogioco videogioco);
	void deleteVideogioco(int id);
	void updateVideogioco(Videogioco videogioco);
	List<Videogioco> ricerca(String titolo);
}
