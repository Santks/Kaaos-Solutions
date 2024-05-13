# Autentikointi
TicketGurussa käytetään perusautentikointia ja CSRF suojaa.

## Käyttäjät ja roolit

Käyttäjätunnukset ja salasanat tallennetaan tietokantaan, ja ne tarkistetaan jokaisen pyynnön yhteydessä. Käyttäjillä on erilaisia rooleja, jotka määrittävät heidän oikeutensa sovelluksessa.

Esimerkki käyttäjästä:
- Käyttäjätunnus: admin@example.com
- Salasana: admin
- Rooli: ROLE_ADMIN

## Autentikointimenetelmät

Käyttäjätunnuksen ja salasanan tulee olla määriteltynä Authorization-headerissa pyynnön mukana. Salasanat on suojattu käyttämällä BCrypt-salausta.

**Autentikointipyynnön esimerkki:**
```json
GET "http://localhost:8080/events"
Host: localhost:8080
Authorization: Basic YWRtaW46YWRtaW4=
```
- Käyttäjätunnus ja salasana ovat koodattu Base64-muotoon.

## CSRF suojauksen käyttö
- CSRF token välitetään evästeessä ja lisätään pyyntöihin.
- Pyyntöjen lähettämiseen tulee sisällyttää CSRF token pyynnön muodossa.

## Käyttäjien rekisteröinti
Uudet käyttäjät voidaan rekisteröidä UserService-luokan registerNewUser-metodilla. Tämä metodi salaa käyttäjän salasanan BCrypt-salauksella ennen sen tallentamista tietokantaan.

## Käyttäjätietojen haku
Käyttäjätiedot haetaan tietokannasta UserDetailsServiceImp-luokan loadUserByUsername-metodilla. Tämä metodi hakee käyttäjän tiedot käyttäjätunnuksen perusteella ja luo UserDetails-olion, joka sisältää käyttäjän tiedot ja oikeudet.