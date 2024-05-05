# Autentikointi

TicketGurussa käytetään perusautentikointia ja CSRF suojaa.

## Käyttäjät ja roolit

- **Käyttäjätunnus:** admin
- **Salasana:** admin
- **Rooli:** ROLE_ADMIN

## Autentikointimenetelmät

Käyttäjätunnuksen ja salasanan tulee olla määriteltynä Authorization-headerissa pyynnön mukana.

**Autentikointipyynnön esimerkki:**

```json
GET "http://localhost:8080/events"
Host: localhost:8080
Authorization: Basic YWRtaW46YWRtaW4=
```
- Käyttäjätunnus ja salasana ovat koodattu Base64-muotoon. Esimerkissä käyttäjätunnus ja salasana ovat molemmat "admin".

## CSRF suojauksen käyttö

- CSRF token välitetään evästeessä ja lisätään pyyntöihin.
- Pyyntöjen lähettämiseen tulee sisällyttää CSRF token pyynnön muodossa.