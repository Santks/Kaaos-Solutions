## Luo lippu

Myyjä voi luoda uuden lipun

**Base-URL**: `localhost:8080`

**Endpoint**: `/api/tickets/`

**Metodi**: `PUT`

**Path-parametrit**: 
|Parametri|Type|Kuvaus|
|---|---|---|


**Data-rajoitukset**
```json
{
    "event": "Olemassa olevan tapahtuman id.",
    "ticketType":"Olemassa olevan lipputyypin id.",
    "order":"Olemassa olevan tilauksen id.",
    "price":"Double-muotoinen arvo.",
    "ticketUsed":"Boolean-muotoinen arvo."
}
```
**Paluukoodi:** 200 OK

**Vaatimukset**: event, ticketType ja order ovat valideja.

**Sisältö:** JSON-muotoinen data lipusta.

