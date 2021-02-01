package com.generation.universogames.auth;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



import com.generation.universogames.security.Roles;

@Service
public class AuthService implements UserDetailsService {
	
	private UtenteRepository dao;
	private PasswordEncoder passwordEncoder;

	@Autowired
	public AuthService(UtenteRepository dao, PasswordEncoder passwordEncoder) {
		this.dao = dao;
		this.passwordEncoder = passwordEncoder;
	}
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<? extends UserDetails> user = dao.findByUsername(username);
		if (user.isPresent()) {
			return user.get();
		}
		throw new UsernameNotFoundException("Nessun utente col username: " + username);
	}
	/**
	 * Questo metodo ausiliario fornisce le istruzioni per il controllo della struttura dei dati tramite le espressioni regolari.
	 * @param regex il pattern dell'informazione inserita come parametro.
	 * @param info l'informazione da verificare.
	 * @return true o false a seconda della correttezza.
	 */
	private boolean check(String regex, String info) {
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(info);
		return matcher.matches();
	}
	/**
	 * Controlla che la password comprenda tra gli 8 e i 20 caratteri e che includa almeno 1 numero, una lettera maiuscola, una minuscola e un carattere speciale tra @, #, $ e %.
	 * @param password
	 * @return true o false a seconda della correttezza.
	 */
	public boolean checkPassword(String password) {
		return check("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,20})", password);
	}
	/**
	 * Controlla che l'indirizzo e-mail sia corretto.
	 * @param email
	 * @return true o false a seconda della correttezza.
	 */
	public boolean checkEmail(String email) {
		return check("[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}", email);
	}
	/**
	 * Questo metodo controlla se l'e-mail del nuovo utente sia già utilizzata.
	 * @return "true" se l'indirizzo è già esistente, falso in caso contrario.
	 */
	public boolean mailPresente(String email) {
		List<Utente> listaUtenti = dao.findByEmail(email);
		return listaUtenti.size() > 0 ? true : false;
	}
	public void signup(String email, String username, String password) {
		Utente newUtente = new Utente();
		newUtente.setEmail(email);
		newUtente.setUsername(username);
		newUtente.setPassword(passwordEncoder.encode(password));
		newUtente.setRuolo(Roles.USER);
		try {
			dao.save(newUtente);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}