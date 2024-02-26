## Hae tapahtumat
Käyttäjä voi hakea kaikki tapahtumat tai vaihtoehtoisesti yksittäisen tapahtuman id:n tai päivämäärän perusteella.

**Base-URL**: `localhost:8080`

**Endpointit**:
- `/api/events` (Hae kaikki tapahtumat)
- `/api/events/{id}` (Hae tapahtuma id:n perusteella)
- `/api/events/date/{date}` (Hae tapahtumat päivämäärän perusteella)

**Metodi:** `GET`

#### Path-parametrit:

Parametri | Tyyppi | Kuvaus
--- | --- | ---
{id} | Long | Haettavan tapahtuman id.
{date} | String | Päivämäärä muodossa "vvvv-mm-dd", jolloin haetaan tapahtumat, jotka ovat alkamassa tai menossa kyseisenä päivänä.

### Vastaukset:

#### Onnistunut pyyntö:
- Paluukoodi: 200 OK
- Sisältö: JSON-muotoinen data, joka sisältää haetut tapahtumat.

#### Virhe:
- Paluukoodi: 404 Not Found
- Sisältö: JSON-muotoinen data, joka sisältää virheilmoituksen, jos tapahtumaa ei löydy annetulla id:llä tai päivämäärällä.