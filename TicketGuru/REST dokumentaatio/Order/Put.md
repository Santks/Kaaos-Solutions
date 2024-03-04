## Päivitä tilaus

Ylläpitäjä voi päivittää tilauksen tietoja.

**Base-URL**: `localhost:8080`

**Endpoint**: `/api/orders/{orderId}`

**Metodi**: `PUT`

**Path-parametrit**: 
|Parametri|Type|Kuvaus|
|---|---|---|
|{orderId}|Long|Muokattavan tilauksen id.|


### Vastaus

#### Onnistunut pyyntö

**Lähetetty JSON-muotoinen data**:
```json
{
    "orderId": 2,
    "customer": {
        "userId": 2,
        "userRole": {
            "userRoleId": 1
        }
    },
    "date": "2024-03-01",
    "totalPrice": 28.00,
    "orderPaid": false,
    "seller": {
        "userId": 3,
        "userRole": {
            "userRoleId": 2
        }
    }
}
```

**Paluukoodi:** 200 OK

**Sisältö:** JSON-muotoinen data

**Body**:
```json
{
    "orderId": 2,
    "customer": {
        "userId": 2,
        "firstName": "Jane",
        "lastName": "Doe",
        "phone": null,
        "email": "jane@doe.com",
        "address": null,
        "activeUser": false,
        "postalCode": null,
        "userRole": {
            "userRoleId": 1,
            "userRoleName": "customer",
            "roleDesc": null,
            "user": null
        }
    },
    "date": "2024-03-01",
    "totalPrice": 28.0,
    "orderPaid": false,
    "seller": {
        "userId": 3,
        "firstName": "Mike",
        "lastName": "Man",
        "phone": null,
        "email": "mikeman@ticketGuru.com",
        "address": null,
        "activeUser": false,
        "postalCode": null,
        "userRole": {
            "userRoleId": 2,
            "userRoleName": "Salesman",
            "roleDesc": null,
            "user": null
        }
    }
}
```

#### Epäonnistunut pyyntö

**Paluukoodi**: 500 Internal server error

**Customer tai Seller id väärin**:
```plaintext
"org.springframework.orm.jpa.JpaObjectRetrievalFailureException: Unable to find com.example.TicketGuru.domain.User with id (annettu id numero)
```

**Paluukoodi**: 400 bad request

**Päivämäärä syötetty väärässä muodossa**:
```plaintext
"org.springframework.http.converter.HttpMessageNotReadableException: JSON parse error: Cannot deserialize value of type `java.time.LocalDate` from String
```
