## Hae käyttäjärooli
Palauttaa listan kaikista käyttäjärooleista

**Base-URL**: `localhost:8080`

**Endpointit**: `api/userroles` (Hae kaikki käyttäjäroolit)

**Metodi**: `GET`

Parametri | Tyyppi | Kuvaus
--- | --- | ---
{id} | Long | Käyttäjäroolin id

### Vastaukset:

#### Onnistunut pyyntö:
- Paluukoodi: 200 OK
- Sisältö: JSON-muotoinen data, joka sisältää haetut käyttäjäroolit

#### Virhe:
- Paluukoodi: 404 Not Found
- Pyyntöparametrit väärät