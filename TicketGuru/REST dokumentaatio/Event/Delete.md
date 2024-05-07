## Poista tapahtuma

Tapahtuman järjestäjä voi poistaa yksittäisen tapahtuman


**Base-URL**: `localhost:8080`

**Endpoint**: `/api/events/{id}`

**Metodi**:`DELETE`

**Path-parametrit**: 
|Parametri|Type|Kuvaus|
|---|---|---|
|{id}|String|Poistettavan tapahtuman id.|

**Responses**

>**Onnistunut poisto**
>
>Code:`200 OK`
>
>Body: `Tapahtuma poistettu onnistuneesti.`

>**Virhe**
>
>Code:`404 Not Found`
>
>Body: `Tapahtumaa ei löydetty.`