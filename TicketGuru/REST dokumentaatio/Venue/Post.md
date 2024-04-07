## Lisää tapahtumapaikka

Luodaan uusi tapahtumapaikka (Venue)

#### HTTP-Pyyntö

- **Metodi:** `POST`
- **Base-URL:** `localhost:8080`
- **Endpoint:** `/venues`

**Sisältö:** JSON-muotoinen

```json
{
    "name": "test",
    "address": "test",
    "phone": "test",
    "email": "test@test.com",
    "capacity": 55555
}
```

**VASTAUS**

```json
{
    "id": 6,
    "name": "test",
    "address": "test",
    "phone": "test",
    "email": "test@test.com",
    "capacity": 55555,
    "postalCode": null
}
```
**Status:** 201 Created