## Hae käyttäjät
Käyttäjä voi hakea kaikki käyttäjät tai vaihtoehtoisesti yksittäisen käyttäjän id:n tai sähköpostiosoitteen perusteella.

**Base-URL**: `localhost:8080`

**Endpointit**:
- `/api/users` (Hae kaikki käyttäjät)
- `/api/users/id/{id}` (Hae käyttäjä id:n perusteella)
- `/api/users/email/{emailaddress}` (Hae käyttäjä sähköpostiosoitteen perusteella)

**Metodi:** `GET`

#### Path-parametrit:

Parametri | Tyyppi | Kuvaus
--- | --- | ---
{id} | Long | Haettavan käyttäjän id.
{emailaddress} | String | Sähköpostiosoite, jonka perusteella tieto käyttäjästä haetaan. Osoite tulee olla täydellinen, kirjainkoolla ei merkitystä.

### Vastaukset:

#### Onnistunut pyyntö:
- Paluukoodi: 200 OK
- Sisältö: JSON-muotoinen data, joka sisältää haetut käyttäjät.

#### Virhe:
- Paluukoodi: 404 Not Found
- Sisältö: JSON-muotoinen data, joka sisältää virheilmoituksen, jos käyttäjää ei löydy annetulla id:llä tai sähköpostiosoiteella.