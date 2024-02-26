## Päivitä tapahtuma

Tapahtuman järjestäjä voi päivittää tapahtuman tietoja

**Base-URL**: `localhost:8080`

**Endpoint**: `/api/events/{id}`

**Metodi**: `PUT`

**Path-parametrit**: 
|Parametri|Type|Kuvaus|
|---|---|---|
|{id}|Long|Muokattavan tapahtuman id.|

**Data-rajoitukset**
```json
{
    "venue": "Olemassa olevan venuen id numero esim. '1'",
    "name": "[1-100 merkkiä]",
    "description": "[1-1000 merkkiä]",
    "eventCategory": "[1-50 merkkiä]",
    "startDate": "Muodossa vvvv-mm-dd",
    "endDate": "Muodossa vvvv-mm-dd",
    "eventStatus": "Yksi merkki joka kuvaa statusta (esim. 'U' = Upcoming)",
    "organiserName": "[1-100 merkkiä]",
    "maxTickets": "Luku muodossa 'long' "
}
```

### Vastaus

#### Onnistunut pyyntö

**Lähetetty JSON-muotoinen data**:
```json
{
    "id": 1,
    "venue": {
        "id": 1,
    },
    "name": "Cool event frfr",
    "description": "Cool event example",
    "eventCategory": "Cool event fasho",
    "startDate": "2024-02-27",
    "endDate": "2024-02-28",
    "eventSatus": "U",
    "organiserName": "Cool events corp.",
    "maxTickets": 35500
}
```

**Paluukoodi:** 200 OK

**Vaatimukset**: Venue id on validi ja sillä löytyy venue sekä annettu data on oikeassa muodossa (ks. [Data-rajoitukset](#data-rajoitukset))

**Sisältö:** JSON-muotoinen data

**Body**:
```json
{
    "id": 1,
    "venue": {
        "id": 1,
        "name": "Olympiastadion",
        "address": "Paavo Nurmen tie 1",
        "phone": "040123456789",
        "email": "demoevent@demomail.com",
        "capacity": 36200,
        "postalCode": {
            "postalCode": "00250",
            "city": "Helsinki",
            "country": "Suomi",
            "id": 1
        }
    },
    "name": "Cool event frfr",
    "description": "Cool event example",
    "eventCategory": "Cool event fasho",
    "startDate": "2024-02-27",
    "endDate": "2024-02-28",
    "eventSatus": "U",
    "organiserName": "Cool events corp.",
    "maxTickets": 35500
}
```

#### Epäonnistunut pyyntö

**Vaatimus**: Jokin annettu data on väärässä muodossa tai annetulla id:llä ei löydy Venue:ta.

**Paluukoodi**: 500 Internal server error

**Venue id väärin**:
```plaintext
org.springframework.orm.jpa.JpaObjectRetrievalFailureException: Unable to find com.example.TicketGuru.domain.Venue with id (annettu id)
```

**Paluukoodi**: 400 bad request

**Päivämäärä syötetty väärässä muodossa**:
```plaintext
org.springframework.http.converter.HttpMessageNotReadableException: JSON parse error: Cannot deserialize value of type `java.time.LocalDate` from String
```

**Attribuutti yli merkkirajan**:
```plaintext
org.springframework.http.converter.HttpMessageNotReadableException: JSON parse error: Cannot deserialize value of type `char` from String. Expected either Integer value code or (max character value )-character String
```

## Huomiot
* Jos attribuutin arvo jätetään tyhjäksi, tulee oletusarvoksi NULL
* Kaikkia attribuutteja ei tarvitse muokata