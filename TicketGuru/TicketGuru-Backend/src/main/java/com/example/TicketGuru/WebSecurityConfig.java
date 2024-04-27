package com.example.TicketGuru;

import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
                                .authorities("ROLE_ADMIN")
                                .and()
                                .withUser("inno")
                                .password(passwordEncoder.encode("testbuild"))
                                .authorities("ROLE_USER")
                                .and()
                                .withUser("manager")
                                .password(passwordEncoder.encode("manager"))
                                .authorities("ROLE_EVENT_MANAGER")
                                .and()
                                .withUser("seller")
                                .password(passwordEncoder.encode("seller"))
                                .authorities("ROLE_SELLER")
                                .and()
                                .withUser("inspector")
                                .password(passwordEncoder.encode("inspector"))
                                .authorities("ROLE_TICKET_INSPECTOR");
        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http
                                .cors((cors) -> cors
                                                .configurationSource((corsConfigurationSource())))
                                .csrf(csrf -> csrf.disable())
                                // .csrf((csrf) -> csrf
                                // .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                                // .csrfTokenRequestHandler(new CsrfTokenRequestAttributeHandler()))
                                .authorizeHttpRequests(authorize -> authorize
                                                .anyRequest().authenticated())
                                .httpBasic(Customizer.withDefaults())
                                .formLogin(Customizer.withDefaults());
                // .httpBasic(HttpSecurityHttpBasicConfigurer -> HttpSecurityHttpBasicConfigurer
                // .authenticationEntryPoint(new
                // HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)));

                return http.build();
        }

        @Bean
        CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                // Millaisista lähteistä PYYNTÖ sallitaan (1):
                configuration.setAllowedOrigins(Arrays.asList("*"));
                // Sallii pyyntötyypit (2):
                configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH"));
                // Sallii OTSIKOT (3):
                configuration.setAllowedHeaders(Arrays.asList("*"));
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }
}