## Päivitä lipputyyppi

Ylläpitäjä voi päivittää lipputyypin tietoja

**Base-URL**: `localhost:8080`

**Endpoint**: `/api/tickettype/{id}`

**Metodi**: `PUT`

**Path-parametrit**: 
|Parametri|Type|Kuvaus|
|---|---|---|
|{id}|Long|Muokattavan lipun id.|

**Data-rajoitukset**
```json
    {
        "name": "lipputyypin nimi",
        "description": "lipputyypin kuvaus"
    }
```
**Paluukoodi:** 200 OK

**Vaatimukset**: nimi ei ole tyhjä arvo.

**Sisältö:** JSON-muotoinen data lipputyypistä.

**Paluukoodi:** 400 Bad Request