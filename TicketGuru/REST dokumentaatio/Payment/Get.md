# Hae maksu

### Myyjä voi hakea maksun tietoja

**BASE-URL**: `localhost:8080`

**ENDPOINT**: `/payments/{id}`

**METODI**: `GET`

**AUTENTIKOINTI**: `Vaaditaan`

### Pyyntö

**ID**: Haettavan maksun ID (1).

### VASTAUS

#### Onnistunut pyyntö

```JSON
{
  "id": 1,
  "Customer_id": 555,
  "Order_id": 13,
  "Amount": "100",
  "PaymentDate": "2024-03-03",
  "PaymentMethod": "Debit Card"
}
```

### Virheviestit

#### 401 Unauthorized
```JSON
{
  "error": "Unauthorized",
  "message": "Autentikointi epäonnistui"
}
```

#### 404 Not Found
```JSON
{
  "error": "Not Found",
  "message": "Maksua ei löytynyt"
}
```

#### 500 Internal Server Error
```JSON
{
  "error": "Internal Server Error",
  "message": "Odottamaton palvelinvirhe"
}
```