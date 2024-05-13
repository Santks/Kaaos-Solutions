## Poista käyttäjärooli
Käyttäjäroolin poistetaan id:n perusteella

**Base-URL**: `localhost:8080`

**Endpointit**: `/api/userroles/{id}`

**Metodi**: `DELETE`

**Path-parametrit**: 
|Parametri|Type|Kuvaus|
|---|---|---|
|{id}|Long|Poistettavan käyttäjäroolin id.|

### Vastaukset:

#### Onnistunut pyyntö:
- Paluukoodi: 200 OK

#### Virhe:
- Paluukoodi: 404 Not Found