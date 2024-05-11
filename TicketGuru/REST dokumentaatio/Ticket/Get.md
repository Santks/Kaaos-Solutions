## Hae liput
Käyttäjä voi hakea kaikki yhteen tapahtumaan liittyvät liput.
Käyttäjä voi hakea yhden tietyn lipun sen id:n perusteella.

**Base-URL**: `localhost:8080`

**Endpointit**:
- `/api/tickets/event/{eventid}` (Hae kaikki tapahtumaan liittyvät liput)
- `/api/tickets/{ticketid}` (Hae lippu id:n perusteella)
- `/api/tickets/uuid/{uuid}` (Hae lippu uuid:n perusteella)

**Metodi:** `GET`

#### Path-parametrit:

Parametri | Tyyppi | Kuvaus
--- | --- | ---
{eventid} | Long | Haettavan lipun id.
{ticketid} | Long | Haettavan lipun id.

**Responses**

#### Onnistunut pyyntö:
- Paluukoodi: 200 OK
- Sisältö: JSON-muotoinen data, joka sisältää haetut liput.

#### Virhe:
- Paluukoodi: 404 Not Found
