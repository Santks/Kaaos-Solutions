# API-dokumentaatio

## Vastauskoodit

Alla on luettelo vastauskoodeista ja niiden merkityksistä:

| Vastauskoodi         | Kuvaus                                      |
|----------------------|---------------------------------------------|
| 200 OK               | Onnistunut pyyntö.                          |
| 400 Bad Request      | Pyynnössä oli virheellisiä tietoja.         |
| 404 Not Found        | Pyydettyä resurssia ei löytynyt.            |
| 500 Internal Server Error | Palvelimella tapahtui virhe käsiteltäessä pyyntöä. |

## Events

#### Endpointit

**GET /events** 
Hae kaikki tapahtumat

**GET /events/{eventId}** 
Hae tapahtuma id

**GET /date/yyyy-MM-dd** 
Hae tapahtumat päivämäärän perusteella

**POST /events** 
Tapahtuman lisääminen

**PUT /events/{eventId}** 
Tapahtuman päivittäminen

**DELETE /events{eventId}** 
Tapahtuman poisto

#### Toimivuus

**GET /events**
Vastauskoodi: 200 OK.

**GET /events/{eventId}**
Vastauskoodi: 200 OK.

**GET /date/yyyy-MM-dd**
Vastauskoodi: 200 OK.

**POST /events**
Vastauskoodi: 200 OK.

**PUT /events/{eventId}**
Vastauskoodi: 200 OK.

**DELETE /events**
Vastauskoodi: 200 OK.

## Orders

#### Endpointit

**GET /orders**
Hae kaikki tilaukset

**GET /orders/{orderId}**
Hae tilaus

**POST /orders**
Lisää tilaus

**PUT orders/{orderId}**
Tilauksen päivittäminen

**DELETE orders/{orderId}**
Tilauksen poisto

#### Toimivuus

**GET /orders**
Vastauskoodi: 200 OK.

**GET /orders/{orderId}**
Vastauskoodi: 200 OK.

**POST /orders**
Vastauskoodi: 200 OK.

**PUT orders/{orderId}**
Vastauskoodi: 200 OK.

**DELETE orders/{orderId}**
Vastauskoodi: 200 OK.

## Payments

#### Endpointit

**GET /payments**
Hae kaikki maksut

**GET /payments/{paymentId}**
Hae maksu

**POST /payments**
Lisää maksu

**PUT /payments/{paymentId}**
Maksun päivittäminen

**DELETE /payments/{paymentId}**
Maksun poisto

#### Toimivuus

**GET /payments**
Vastauskoodi: 200 OK.

**GET /payments/{paymentId}**
Vastauskoodi: 200 OK.

**POST /payments**
Vastauskoodi: 200 OK.

**PUT /payments/{paymentId}**
Vastauskoodi: 200 OK.

**DELETE /payments/{paymentId}**
Vastauskoodi: 200 OK.