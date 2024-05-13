## Luo uusi käyttäjärooli
Luo uuden käyttäjäroolin

**Base-URL**: `localhost:8080`

**Endpoint**: `/api/usersroles`

**Metodi**:`POST`

**Path-parametrit**: 
|Parametri|Type|Kuvaus|
|---|---|---|
userRoleName|String|Käyttäjäroolin nimi

**Data-rajoitukset**
```json
    {
        "userRoleName": "Uuden roolin nimi",
    }
```

### Vastaukset:

#### Onnistunut pyyntö:
- Paluukoodi: 201 Created
- Käyttäjärooli luotiin onnistuneesti. Palauttaa luodun käyttäjäroolin tiedot

#### Virhe:
- Paluukoodi: 404 Not Found
- Pyyntöparametrit väärät