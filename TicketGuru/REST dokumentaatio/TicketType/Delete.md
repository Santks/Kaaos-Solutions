## Poista lipputyyppi

Käyttäjä voi poistaa lipputyypin sen id:n perusteella.


**Base-URL**: `localhost:8080`

**Endpoint**: `/api/tickettype/{id}`

**Metodi**:`DELETE`

**Path-parametrit**: 
|Parametri|Type|Kuvaus|
|---|---|---|
|{id}|String|Poistettavan lipputyypin id.|

**Responses**

>**Onnistunut poisto**
>
>Code:`200 OK`
>
>Body: `Poistettu`

>**Virhe**
>
>Code:`404 Not Found`
>
>Body: ``