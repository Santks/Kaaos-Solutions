## Hae lipputyypit
Käyttäjä voi hakea kaikki lipputyypit tai vaihtoehtoisesti yksittäisen lipputyypin id:n perusteella.

**Base-URL**: `localhost:8080`

**Endpointit**:
- `/api/tickettype` (Hae kaikki lipputyypit)
- `/api/tickettype/id/{id}` (Hae lipputyyppi id:n perusteella)

**Metodi:** `GET`

#### Path-parametrit:

Parametri | Tyyppi | Kuvaus
--- | --- | ---
{id} | Long | Haettavan lipputyypin id.

### Vastaukset:

#### Onnistunut pyyntö:
- Paluukoodi: 200 OK
- Sisältö: JSON-muotoinen data, joka sisältää haetut lipputyypit.

#### Virhe:
- Paluukoodi: 404 Not Found
- Sisältö: JSON-muotoinen data, joka sisältää virheilmoituksen, jos lipputyyppiä ei löydy annetulla id:llä.