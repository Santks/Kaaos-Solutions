## Päivitä tapahtuma

Tapahtuman järjestäjä voi päivittää tapahtuman tietoja

**URL**: `/api/events/{id}`

**Metodi**: PUT

**Autentikointi vaaditaan**: 

**Tarvittavat oikeudet**: 

**Data-rajoitukset**

```json
{
    "name": "[1-100 merkkiä]",
    "description": "[1-1000 merkkiä]",
    "eventCategory": "[1-50 merkkiä]",
    "startDate": "Muodossa dd.mm.vvvv",
    "endDate": "Muodossa dd.mm.vvvv",
    "eventStatus": "Yksi merkki joka kuvaa statusta (esim. 'U' = Upcoming)",
    "organiserName": "[1-100 merkkiä]",
    "maxTickets": "Luku"
}