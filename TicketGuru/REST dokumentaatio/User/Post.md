## Luo käyttäjä

Ylläpitäjä voi luoda uuden käyttäjän

**Base-URL**: `localhost:8080`

**Endpoint**: `/api/users/`

**Metodi**: `POST`

**Path-parametrit**: 
|Parametri|Type|Kuvaus|
|---|---|---|


**Data-rajoitukset**
```json
{
     {
        "firstName": "etunimi",
        "lastName": "sukunimi",
        "phone": "null, tai puhelinnumero",
        "email": "uniikki sähköpostiosoite",
        "address": "null, tai osoite",
        "activeUser": "boolean: false",
        "postalCode": "null, tai olemassaoleva postinumero",
        "userRole": {
            "userRoleId": "olemassa olevan roolin id"
        }
    }
}
```
**Paluukoodi:** 200 OK

**Vaatimukset**: sähköposti on uniikki. userRoleId on olemassa. etunimi ja sukunimi eivät ole tyhjiä arvoja.

**Sisältö:** JSON-muotoinen data käyttäjästä.

**Paluukoodi:** 400 Bad Request

