package com.generation.universogames.auth;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UtenteRepository extends CrudRepository<Utente,Integer>, UserDao{
	
}