## Poista lippu

Tapahtuman järjestäjä voi poistaa yksittäisen tapahtuman


**Base-URL**: `localhost:8080`

**Endpoint**: `/api/tickets/{id}`

**Metodi**:`DELETE`

**Path-parametrit**: 
|Parametri|Type|Kuvaus|
|---|---|---|
|{id}|String|Poistettavan lipun id.|

**Responses**

>**Onnistunut poisto**
>
>Code:`200 OK`
>
>Body: `deleted ticket`

>**Virhe**
>
>Code:`404 Not Found`
>
>Body: `no such ticket`