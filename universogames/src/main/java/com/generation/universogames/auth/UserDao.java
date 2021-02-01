package com.generation.universogames.auth;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;

public interface UserDao {
	/**
	 * Ricerca uno username nel database.
	 * @param username
	 * @return
	 */
	Optional<? extends UserDetails> findByUsername(String username);
	/**
	 * Ricerca un indirizzo e-mail nel database.
	 * @param email
	 * @return
	 */
	List<Utente> findByEmail(String email);
}
