## Päivitä tapahtumapaikka

Päivitetään olemassa olevan tapahtumapaikan (Venue) tiedot

#### HTTP-Pyyntö

- **Metodi:** `PUT`
- **Base-URL:** `localhost:8080`
- **Endpoint:** `/venues/{venueId}`

**Sisältö:** JSON-muotoinen

```json
{
    "id": 5,
    "name": "test",
    "address": "test",
    "phone": "test",
    "email": "test@test.com",
    "capacity": 55555,
    "postalCode": {
        "id": 3
    }
}
```

**VASTAUS**

```json
{
    "id": 5,
    "name": "test",
    "address": "test",
    "phone": "test",
    "email": "test@test.com",
    "capacity": 55555,
    "postalCode": {
        "postalCode": "20720",
        "city": "Turku",
        "country": "Suomi",
        "id": 3
    }
}
```
**Status:** 200 OK