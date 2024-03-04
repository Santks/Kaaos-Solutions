# Luo maksu

### Myyjä voi luoda uuden maksun

**BASE-URL**: `localhost:8080`

**ENDPOINT**: `/payments`

**METODI**: `POST`

**AUTENTIKOINTI**: `Vaaditaan`

### Pyyntö

```JSON
{
  "Customer_id": 555,
  "Order_id": 13,
  "Amount": "100",
  "PaymentDate": "2024-03-03",
  "PaymentMethod": "Debit Card"
}
```

### VASTAUS

```JSON
{
  "id": 123,
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

#### 500 Internal Server Error
```JSON
{
  "error": "Internal Server Error",
  "message": "Odottamaton palvelinvirhe"
}
```