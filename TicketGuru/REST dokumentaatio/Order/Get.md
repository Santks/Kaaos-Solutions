## Hae tilaukset
Järjestelmän omistaja voi hakea kaikki tilaukset tai yksittäisen tilauksen id numerolla.

**Base-URL**: `localhost:8080`

**Endpointit**:
- `/api/orders` (Hae kaikki tilaukset)
- `/api/orders/{orderId}` (Hae tilaus orderId:n perusteella)

**Metodi:** `GET`

#### Path-parametrit:

Parametri | Tyyppi | Kuvaus
--- | --- | ---
{orderId} | Long | Haettavan tilauksen id.


### Vastaukset:

#### Onnistunut pyyntö:
- Paluukoodi: 200 OK
- Sisältö: JSON-muotoinen data, joka sisältää haetut tilaukset.

#### Virhe:
- Paluukoodi: 404 Not Found
- Sisältö: JSON-muotoinen data, joka sisältää virheilmoituksen, jos tilausta ei löydy annetulla orderId:llä tai ei ole näytettäviä tilauksia.