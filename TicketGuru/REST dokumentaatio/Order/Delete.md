## Poista tilaus

Ylläpitäjä voi poistaa tilauksen sen id numerolla.


**Base-URL**: `localhost:8080`

**Endpoint**: `/api/orders/{orderId}`

**Metodi**:`DELETE`

**Path-parametrit**: 
|Parametri|Type|Kuvaus|
|---|---|---|
|{orderId}|String|Poistettavan tilauksen id.|

**Responses**

>**Onnistunut poisto**
>
>Code:`200 OK`
>
>Body: `Tilaus poistettu.`

>**Virhe**
>
>Code:`404 Not Found`
>
>Body: `Tilausta ei löytynyt`