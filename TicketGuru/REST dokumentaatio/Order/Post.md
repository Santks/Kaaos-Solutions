### Lisää tilaus
Ylläpitäjä tai myyjä voi listätä uuden tapahtuman.

**Base-URL:** `localhost:8080`

**Endpoint**: `/api/orders`

**Metodi:** `POST`

**Sisältö:** JSON-muotoinen

```json
{
    "customer": {
        "userId": 2,
        "userRole": {
            "userRoleId": 1
        }
    },
    "date": "2024-03-01",
    "totalPrice": 22.00,
    "orderPaid": false,
    "seller": {
        "userId": 2,
        "userRole": {
            "userRoleId": 2
        }
    }
}
```

**Paluukoodi:**

- `200 OK`: Tilaus lisättiin onnistuneesti
- `400 Bad Request`: Virheellinen pyyntö, esimerkiksi puuttuvat tai virheelliset parametrit
- `500 Internal Server Error`: Palvelimella tapahtui virhe

**Sisältö: JSON-muotoinen vastaus:**
- `Jos jättää kenttiä tyhjäksi, arvoksi tulee null`

```json
{
    "orderId": 3,
    "customer": {
        "userId": 1,
        "firstName": "John",
        "lastName": "Doe",
        "phone": null,
        "email": "john@doe.com",
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
    "totalPrice": 2.0,
    "orderPaid": false,
    "seller": {
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
    }
}
```

## Esimerkit

**Onnistunut pyyntö:**

#### Pyyntö:

```json
{
    "orderId": 3,
    "customer": {
        "userId": 1,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@doe.com"
    },
    "date": "2024-03-01",
    "totalPrice": 2.0,
    "orderPaid": false,
    "seller": {
        "userId": 2,
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "jane@doe.com"
    }
}
```

**VASTAUS**

```json
{
    "orderId": 3,
    "customer": {
        "userId": 1,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@doe.com"
    },
    "date": "2024-03-01",
    "totalPrice": 2.0,
    "orderPaid": false,
    "seller": {
        "userId": 2,
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "jane@doe.com"
    }
}
```

**Virheellinen pyyntö (päivämäärä väärässä muodossa):**


#### Pyyntö:

```json
{
    "customer": {
        "userId": 2,
        "userRole": {
            "userRoleId": 1
        }
    },
    "date": "01-03-2024",
    "totalPrice": 22.00,
    "orderPaid": false,
    "seller": {
        "userId": 2,
        "userRole": {
            "userRoleId": 2
        }
    }
}

**VASTAUS**

```plaintext
org.springframework.http.converter.HttpMessageNotReadableException: JSON parse error: Cannot deserialize value of type `java.time.LocalDate` from String
```