## Päivitä käyttäjärooli
Päivittää olemassa olevan käyttäjäroolin

**Base-URL**: `localhost:8080`

**Endpoint**: `/api/userroles/{id}`

**Metodi**: `PUT`

**Path-parametrit**: 
| Parametri        | Type | Kuvaus                              |
|---------------|--------|-------------------------------------|
| userRoleId    | Long   | Käyttäjäroolin tunniste.           |
| userRoleName  | String | Käyttäjäroolin nimi.               |
| roleDesc      | String | Käyttäjäroolin kuvaus.             |
| user          | Object | Käyttäjäroolin käyttäjä.           |

### Vastaukset:

#### Onnistunut pyyntö:
- Paluukoodi: 200 OK
- Sisältö: JSON-muotoinen data, joka sisältää päivitetyn käyttäjäroolin tiedot

#### Virhe:
- Palukoodi: 400 Bad Request
- Pyyntöparametrit väärät