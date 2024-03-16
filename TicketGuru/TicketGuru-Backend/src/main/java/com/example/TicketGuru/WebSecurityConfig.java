package com.example.TicketGuru;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .inMemoryAuthentication()
                .withUser("admin")
                .password(passwordEncoder.encode("admin"))
                .authorities("ROLE_ADMIN");
    }

    @SuppressWarnings("deprecation")
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
        //.csrf()
//        .disable()
        .csrf((csrf) -> csrf
				.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
        .csrfTokenRequestHandler(new CsrfTokenRequestAttributeHandler()))
        .authorizeHttpRequests(authorize -> authorize
                .anyRequest().authenticated())
                .httpBasic(HttpSecurityHttpBasicConfigurer -> HttpSecurityHttpBasicConfigurer
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)));
        return http.build();
    }
}
