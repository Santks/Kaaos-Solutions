### Rajapinnan kuvaus tapahtumien lisäämiseen

**Base-URL:** `localhost:8080`

**Endpoint**: `/api/events`

**Metodi:** `POST`

**Sisältö:** JSON-muotoinen

```json
{
    "venueId": 123,
    "name": "Tapahtuman nimi",
    "description": "Tapahtuman kuvaus",
    "eventCategory": "Tapahtuman kategoria",
    "startDate": "2024-02-25",
    "endDate": "2024-02-26",
    "eventStatus": "A",
    "organiserName": "Tapahtuman järjestäjän nimi",
    "maxTickets": 100
  }
```

**Paluukoodi:**

- `201 Created`: Tapahtuma lisättiin onnistuneesti
- `400 Bad Request`: Virheellinen pyyntö, esimerkiksi puuttuvat tai virheelliset parametrit
- `401 Unauthorized`: Käyttäjä ei ole autentikoitu
- `403 Forbidden`: Käyttäjällä ei ole oikeutta lisätä tapahtumia
- `500 Internal Server Error`: Palvelimella tapahtui virhe

**Sisältö: JSON-muotoinen vastaus:**
```json
{
  "eventId": 456,
  "message": "Tapahtuma lisättiin onnistuneesti"
}
```

## Esimerkit

**Onnistunut pyyntö:**

#### Pyyntö:

```json
{
  "venueId": 123,
  "name": "Tapahtuman nimi",
  "description": "Tapahtuman kuvaus",
  "eventCategory": "Tapahtuman kategoria",
  "startDate": "2024-02-25",
  "endDate": "2024-02-26",
  "eventStatus": "A",
  "organiserName": "Tapahtuman järjestäjän nimi",
  "maxTickets": 100
}
```

**VASTAUS**

```json
{
  "eventId": 456,
  "message": "Tapahtuma lisättiin onnistuneesti"
}
```

**Virheellinen pyyntö (puuttuvat parametrit):**

#### Pyynntö:

```json
{
  "venueId": 123,
  "name": "Tapahtuman nimi",
  "description": "Tapahtuman kuvaus"
}
```

**VASTAUS**

```json
{
  "error": "Puuttuvat parametrit: eventCategory, startDate, endDate, eventStatus, organiserName, maxTickets"
}
```