## Luo lipputyyppi

Ylläpitäjä voi luoda uuden lipputyypin

**Base-URL**: `localhost:8080`

**Endpoint**: `/api/tickettype`

**Metodi**: `POST`

**Path-parametrit**: 
|Parametri|Type|Kuvaus|
|---|---|---|


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

