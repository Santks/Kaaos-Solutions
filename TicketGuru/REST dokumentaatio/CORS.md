## CORS (Cross-Origin Resource Sharing)

Cross-Origin Resource Sharing (CORS) on JavaScript-ympäristön mekanismi, jolla säädellään, millaisia pyyntöjä selaimessa ajettavasta JavaScript-ohjelmasta voidaan tehdä. Tarkoituksena on estää sivuilla ladattuja JavaScript-ohjelmia tekemästä mielivaltaisia HTTP-pyyntöjä mihin tahansa. 


TicketGurussa CORS on konfiguroitu sallimaan kaikkien lähteiden pyynnöt. Konfiguraatio sallii seuraavat toiminnot:

1. **Sallii kaikki lähteet (Allow-Origin):** Kaikki lähteet ovat sallittuja asettamala `*`
2. **Sallitut pyyntötyypit (Allow-Methods):** Tässä tapauksessa sallitaan GET, POST, PUT, DELETE ja PATCH
3. **Sallitut otsikot (Allow-Headers):** Kaikki otsikot ovat sallittuja asettamalla `*`

### CORS-konfiguraatio TicketGurussa

```java
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
```