package com.generation.universogames.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.generation.universogames.auth.AuthService;

@Configuration
@EnableWebSecurity
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {
	private final PasswordEncoder passwordEncoder;
	private final AuthService authService;
	@Autowired
	public ApplicationSecurityConfig(PasswordEncoder passwordEncoder, AuthService authService) {
		super();
		this.passwordEncoder = passwordEncoder;
		this.authService = authService;
	}
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		//super.configure(http);
		http
			.csrf()
			.disable()
			.authorizeRequests()
			.antMatchers("/","/*.html","/**/*.html","/**/*.css","/**/*.js","/signup.html", "/signup", "/login", "/fail.html", "/forbidden.html", "/assets/**")
			.permitAll()
			.antMatchers("/public/**").permitAll()
			.antMatchers(HttpMethod.GET, "/notizie/**").permitAll()
			.antMatchers(HttpMethod.GET, "/videogiochi/**").permitAll()
			.antMatchers(HttpMethod.GET, "/recensioni/**").permitAll()
			//.antMatchers("/index.html").hasAnyRole(Roles.ADMIN, Roles.USER)
			.antMatchers("/altro.html").hasAnyRole(Roles.ADMIN, Roles.USER)
			.antMatchers("/account.html").hasAnyRole(Roles.ADMIN, Roles.USER)
			.antMatchers("/accountmanager/**").hasAnyRole(Roles.ADMIN)
			.antMatchers(HttpMethod.DELETE, "/recensioni/**").hasAnyRole(Roles.ADMIN, Roles.USER)
			.antMatchers(HttpMethod.POST, "/recensioni/**").hasAnyRole(Roles.ADMIN, Roles.USER)
			.antMatchers(HttpMethod.PUT, "/recensioni/**").hasAnyRole(Roles.ADMIN, Roles.USER)
			.antMatchers(HttpMethod.DELETE, "/notizie/**").hasAnyRole(Roles.ADMIN)
			.antMatchers(HttpMethod.POST, "/notizie/**").hasAnyRole(Roles.ADMIN)
			.antMatchers(HttpMethod.PUT, "/notizie/**").hasAnyRole(Roles.ADMIN)
			//.antMatchers(HttpMethod.GET, "/videogiochi/**").hasAnyRole(Roles.ADMIN, Roles.USER)
			.antMatchers(HttpMethod.DELETE, "/videogiochi/**").hasAnyRole(Roles.ADMIN)
			.antMatchers(HttpMethod.POST, "/videogiochi/**").hasAnyRole(Roles.ADMIN)
			.antMatchers(HttpMethod.PUT, "/videogiochi/**").hasAnyRole(Roles.ADMIN)
			//.antMatchers("/videogiochi").hasAnyRole(Roles.ADMIN)
			//.antMatchers("main.js").hasAnyRole(Roles.ADMIN, Roles.USER)
			//.antMatchers("style.css").hasAnyRole(Roles.ADMIN, Roles.USER)
			.anyRequest().authenticated()
			.and()
			.exceptionHandling()
			.accessDeniedPage("/forbidden.html")
			.and()
			.formLogin()
			.loginPage("/login.html")
			.loginProcessingUrl("/login")
			.permitAll()
			.defaultSuccessUrl("/",true)
			.failureUrl("/")
			.and()
			.logout().logoutUrl("/logout")
			.logoutSuccessUrl("/loggedout.html")
			.clearAuthentication(true).logoutSuccessUrl("/");
	}
	@Bean
	public DaoAuthenticationProvider daoAuthenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setPasswordEncoder(passwordEncoder);
		provider.setUserDetailsService(authService);
		return provider;
	}
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		//super.configure(auth);
		auth.authenticationProvider(daoAuthenticationProvider());
	}
	
}
