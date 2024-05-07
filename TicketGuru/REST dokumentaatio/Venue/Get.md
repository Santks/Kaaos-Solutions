## Hae tapahtumapaikka

Haetaan tapahtumapaikkoja (Venue)

- **Metodi:** `GET`
- **Base-URL:** `localhost:8080`
- **Endpointit:**
`/venues/{venueId}` `/venues` `/venues/name/{venueName}`

**Sisältö:** JSON-muotoinen

```json
{
    "id": 5,
    "name": "test",
    "address": "test",
    "phone": "test",
    "email": "test@test.com",
    "capacity": 555,
    "postalCode": null
}
```
**Status:** 200 OK