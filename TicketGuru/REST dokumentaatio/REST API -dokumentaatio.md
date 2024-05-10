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

## Tickets

#### Endpointit

**GET /tickets/event/{eventid}**
Hae kaikki liput tapahtuman id:n perusteella

**GET /tickets/{ticketid}**
Hae yksittäinen lippu id:n perusteella

**GET /tickets/uuid/{uuid}**
Hae yksittäinen lippu UUID:n perusteella

**POST /tickets**
Lisää uusi lippu

**PUT /tickets/{ticketid}**
Päivitä lippu

**DELETE /tickets/{ticketid}**
Poista lippu

**PATCH /tickets/uuid/{uuid}**
Päivitä lipun käyttöpäiväys

#### Toimivuus

**GET /tickets/event/{eventid}**
Vastauskoodi: 200 OK.

**GET /tickets/{ticketid}**
Vastauskoodi: 200 OK.

**GET /tickets/uuid/{uuid}**
Vastauskoodi: 200 OK.

**POST /tickets**
Vastauskoodi: 200 OK.

**PUT /tickets/{ticketid}**
Vastauskoodi: 200 OK.

**DELETE /tickets/{ticketid}**
Vastauskoodi: 200 OK.

**PATCH /tickets/uuid/{uuid}**
Vastauskoodi: 200 OK.

## Ticket Types

#### Endpointit

**GET /tickettype**
Hae kaikki lipputyypit

**GET /tickettype/id/{tickettypeid}**
Hae yksittäinen lipputyyppi

**GET /tickettype/event/{eventid}**
Hae kaikki yhteen tapahtumaan liittyvät lipputyypit

**POST /tickettype**
Lisää uusi lipputyyppi

**PUT /tickettype/{tickettypeid}**
Päivitä lipputyyppi

**DELETE /tickettype/{tickettypeid}**
Poista lipputyyppi

#### Toimivuus

**GET /tickettype**
Vastauskoodi: 200 OK.

**GET /tickettype/id/{tickettypeid}**
Vastauskoodi: 200 OK.

**POST /tickettype**
Vastauskoodi: 200 OK.

**PUT /tickettype/{tickettypeid}**
Vastauskoodi: 200 OK.

**DELETE /tickettype/{tickettypeid}**
Vastauskoodi: 200 OK.

## Users

#### Endpointit

**GET /users**
Hae kaikki käyttäjät

**GET /users/id/{id}**
Hae yksittäinen käyttäjä

**GET /users/email/{emailaddress}**
Hae käyttäjä sähköpostiosoitteen perusteella

**POST /users**
Lisää käyttäjä

**PUT /users/{id}**
Päivitä käyttäjä

**DELETE /users/{id}**
Poista käyttäjä

#### Toimivuus

**GET /users**
Vastauskoodi: 200 OK.

**GET /users/id/{id}**
Vastauskoodi: 200 OK.

**GET /users/email/{emailaddress}**
Vastauskoodi: 200 OK.

**POST /users**
Vastauskoodi: 200 OK.

**PUT /users/{id}**
Vastauskoodi: 200 OK.

**DELETE /users/{id}**
Vastauskoodi: 200 OK.

## Venues

#### Endpointit

**GET /venues**
Hae kaikki tapahtumapaikat

**GET /venues/{venueId}**
Hae tapahtumapaikka

**GET /venues/name/{venueName}**
Hae tapahtumapaikka nimen perusteella

**POST /venues**
Lisää tapahtumapaikka

**PUT /venues/{venueId}**
Tapahtumapaikan päivittäminen

**DELETE /venues/{venueId}**
Tapahtumapaikan poisto

#### Toimivuus

**GET /venues**
Vastauskoodi: 200 OK.

**GET /venues/{venueId}**
Vastauskoodi: 200 OK.

**GET /venues/name/{venueName}**
Vastauskoodi: 200 OK.

**POST /venues**
Vastauskoodi: 200 OK.

**PUT /venues/{venueId}**
Vastauskoodi: 200 OK.

**DELETE /venues/{venueId}**
Vastauskoodi: 200 OK.