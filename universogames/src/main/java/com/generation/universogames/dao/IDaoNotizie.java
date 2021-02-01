package com.generation.universogames.dao;

import java.util.List;

import com.generation.universogames.model.Notizia;

public interface IDaoNotizie {
	List<Notizia> notizie();
	Notizia notizia(int id);
	void addNotizia(Notizia notizia);
	void deleteNotizia(int id);
	void updateNotizia(Notizia notizia);
}
