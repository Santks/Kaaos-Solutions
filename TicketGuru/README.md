# TicketGuru by Kaaos Solutions
Tiimi: Ilja Haapanen, Leonid Petrov, Sampsa Loukkola, Santeri Kuronen.


## Johdanto
Projektin tarkoituksena on tuottaa lipunmyyntijärjestelmä. Asiakkaana on lipputoimisto, joka on tilannut lipunmyyntijärjestelmän lippujen myymiseen myyntipisteessään. Alustava nimi järjestelmälle on TicketGuru.

Lipputoimisto määrittelee TicketGurussa tapahtumat, joihin lippuja myydään. Sovelluksella hallinnoidaan sekä seurataan lipunmyyntiä. Lipunmyyjät ja toimiston henkilökunta käyttävät sovellusta, asiakkaat eivät voi ostaa lippuja suoraan järjestelmästä omatoimisesti vaan myynti tapahtuu ennakkoon myyjän kautta tai tapahtuman ovelta. Tapahtumia voi lisätä, muokata ja niihin voi luoda erilaisia lipputyyppejä. Lippuja pitää voida myydä ja tulostaa ja lippujen on sisällettävä helposti tarkastettava yksilöivä koodi, jotta lippu voidaan varmentaa aidoksi sekä merkitä käytetyksi. Ennakkomyynnin jälkeen jäljellä olevat liput tulee pystyä tulostamaan, jotta ne voidaan myydä tapahtuman ovella.

Myytyjen lippujen määrää voidaan seurata raporteilta tapahtumakohtaisesti. Järjestelmä on tarkoitettu käytettäväksi selaimen kautta päätteellä, ja sen on tarkoitus olla täysin responsiivinen ja selainriippumaton.

Asiakas haluaa jatkokehittää ja laajentaa palveluitaan myös verkkokaupan suuntaan, mutta jatkokehitys ei ole osa tätä projektia.


## Järjestelmän määrittely
Lipunmyyntijärjestelmä on määritelty alla erikseen käyttäjäryhminä, käyttäjätarinoina sekä käyttötapauskaaviona.


### Käyttäjäryhmät
**Tilaaja**
- Lipputoimisto, joka on tilannut lipunmyyntijärjestelmän

**Pääkäyttäjä**
- Pääkäyttäjä voi lisätä, muokata sekä poistaa käyttäjäoikeuksia

**Ylläpitäjä**
- Ylläpitäjä syöttää järjestelmään tapahtumia

**Myyjä**
- Myyjä lisää järjestelmään tilauksia ja tarkastaa lippuja

**Lipuntarkastaja**
- Lipuntarkastaja tarkastaa tapahtuman ovella asiakkaiden lippuja.

**Asiakas**
- Asiakas ostaa lipun tiettyyn tapahtumaan


### Käyttäjätarinat
Käyttäjätarinat löytyvät projektin SCRUM-taulun vasemmasta laidasta. [Linkki tauluun](https://github.com/users/Santks/projects/3/views/1).


### Käyttötapauskaavio
![Käyttötapauskaavio](kayttotapauskaavio.png)


## Käyttöliittymä
Alustava tekstimuotoinen mallikuvaus käyttöliittymästä rautalankamallin perusteella.

| Näkymä | Kuvaus |
|--------|--------|
| Lipunmyynti | Listaus tapahtumista, joihin lippuja myydään. Tapahtumista tiedot (nimi, päivämäärä, kellonaika). Valitusta tapahtumasta tulee näkyville myös lippujen kategoriat ja hinnat. Ostettavien lippujen määrää voi vaihtaa. Lippujen kokonaissumma näytetään myyntitapahtumaan johtavan painikkeen läheisyydessä. |
| Myyntitapahtuma | Ostetuista lipuista näytetään yhteenveto, josta tulee ilmi myyntitapahtuman yksilöivä tunnus, maksupäivämäärä ja kellonaika, sekä maksettu summa. Lisäksi taulukko ostetuista tuotteista kategorisoituna (tapahtuma, lipputyyppi, hinta, yksilöivä tunnus). Näkymässä on myös painike lippujen tulostusta varten. |
| Tapahtumien hallinta (listaus) | Ylläpidon näkymä listauksena tapahtumista ja niiden tiedoista. Jokaisen tapahtuman yhteydessä painikkeet, joista siirtymä eri näkymiin: (muokkaus, lipputyypit, myyntiraportti). Näkymässä on myös painike uuden tapahtuman luontia varten. |
| Tapahtumien hallinta (muokkaus) | Näkymä, jossa kaikkia tapahtuman tietoja voi muokata poislukien lipputyypit. Näkymässä myös tallennus-painike. |
| Tapahtumien hallinta (uusi) | Näkymä yhtenäinen "Tapahtumien hallinta (muokkaus)" kanssa. |
| Tapahtumien hallinta (lipputyypit) | Yhden tapahtuman lipputyypit ja niiden tiedot listaava näkymä. Jokaisen listatun lipputyypin yhteydessä painike tietojen muokkausta varten. Uuden lipputyypin lisäystä varten lomake-tyyppinen ratkaisu. |
| Myyntiraportti | Yhden tapahtuman yhteenveto, josta selviää tapahtumaan myytyjen lippujen tyypit ja kappalemäärät. Painike, josta siirtymä näkymään "Tapahtuma (myyntitapahtumat)". |
| Tapahtuma (myyntitapahtumat) | Näkymä, jossa listaus kaikista yhden tapahtuman myyntitapahtumista. Kategorisoitu (aika, yksilöivä tunnus, kokonaissumma, toiminnot). Toiminnot-sarakkeessa painike näkymään, jossa tarkemmat tiedot yhdestä myyntitapahtumasta. |

### Käyttöliittymäkaavio
Kirjautumisen yhdeydessä tarkistetaan käyttäjän oikeudet ja sen mukaan määräytyy, mitä etusivulla näytetään. Esimerkiksi vain pääkäyttäjä pääsee muokkaamaan käyttäjiä ja käyttäjäoikeuksia, kun taas myyjällä on oikeudet vain lippujen myymiseen ja lipuntarkastajalla on vain mahdollisuus tarkastaa lipun voimassaolo.

![Käyttöliittymäkaavio](kayttoliittymakaavio.png)


## Tietokanta
Järjestelmään säilöttävät ja siinä käsiteltävät tiedot ja niiden väliset suhteet on kuvattu alla UML-kaaviona sekä tietohakemistona.

### UML-kaavio
![UML-kaavio](tietokantakaavio.png)


### TG_Event
TG_Event sisältää tapahtumat. TG_Event on yhteydessä TG_Venue -luokkaan (ManyToOne) ja TG_Ticket -luokkaan (OneToMany).

| Kenttä | Tyyppi | Kuvaus |
|--------|--------|--------|
|Event_id|AN (PK)|Tapahtuman id|
|Venue_id|N (FK) |Paikan id|
|Name|C/100|Tapahtuman nimi|
|Description|C/1000|Tapahtuman kuvaus|
|EventCategory|C/50|Tapahtuman kategoria|
|StartDate|LocalDate|Alkamispäivä|
|EndDate|LocalDate|Päättymispäivä|
|EventStatus|C/50|Tapahtuman status|
|OrganiserName|C/100|Järjestäjän nimi|
|MaxTickets|N|Lippujen maksimimäärä|


### TG_Order
TG_Order sisältää tilaukset. TG_Order on yhteydessä TG_User -luokkaan (ManyToOne) sekä TG_Ticket ja TG_Payment -luokkiin (OneToMany).

| Kenttä | Tyyppi | Kuvaus |
|--------|--------|--------|
|Order_id|AN (PK)|Tilauksen id|
|Customer_id|N (FK)|Asiakkaan id|
|Date|LocalDate|Tilauspäivä|
|TotalPrice|Double|Kokonaishinta|
|OrderPaid|Boolean|Onko tilaus maksettu? (True/False)|
|Seller_id| N (FK)|Myyjän id|


### TG_Payment
TG_Payment sisältää maksut. TG_Payment on yhteydessä TG_User ja TG_Order -luokkiin (ManyToOne).

| Kenttä | Tyyppi | Kuvaus |
|--------|--------|--------|
|Payment_id|AN (PK)|Maksun id|
|Customer_id|N (FK)|Asiakkaan id|
|Order_id|N (FK)|Tilauksen id|
|Amount|Double|Summa|
|PaymentDate|LocalDate|Maksupäivä|
|PaymentMethod|C/50|Maksutapa|


### TG_Ticket
TG_Ticket sisältää liput. TG_Ticket on yhteydessä Event, TicketType ja Order -luokkiin (ManyToOne).

| Kenttä | Tyyppi | Kuvaus |
|--------|--------|--------|
|Ticket_id|AN (PK)|Lipun id|
|Event_id|N (FK)|Tapahtuman id|
|TicketType_id|N (FK)|Lipputyypin id|
|Order_id|N (FK)|Tilauksen id|
|Price|Double|Lipun hinta|
|TicketUsed|LocalDateTime|Aikaleima lipulle (jos käytetty)|


### TG_User
TG_User sisältää käyttäjät. TG_User on yhteydessä PostalCode ja UserRole -luokkiin (ManyToOne) ja Order ja Payment -luokkiin (OneToMany).

| Kenttä | Tyyppi | Kuvaus |
|--------|--------|--------|
|User_id|AN (PK)|Käyttäjän id|
|FirstName|C/50|Etunimi|
|LastName|C/50|Sukunimi|
|Phone|C/20|Puhelinnumero|
|Email|C/50|Sähköpostiosoite|
|Address|C/100|Osoite|
|PostalCode|N (FK)|Postinumeron id|
|ActiveUser|Boolean|Onko käyttäjä aktiivinen? (True/False)|
|UserRoleId|N (FK)|Käyttäjäroolin id|


### TG_Venue
TG_Venue sisältää tapahtumapaikat. TG_Venue on yhteydessä PostalCode -luokkaan (ManyToOne) ja Event -luokkaan (OneToMany).

| Kenttä | Tyyppi | Kuvaus |
|--------|--------|--------|
|Venue_id|AN (PK)|Tapahtumapaikan id|
|Name|C/100|Tapahtumapaikan nimi|
|Address|C/100|Osoite|
|Phone|C/20|Puhelinnumero|
|Email|C/50|Sähköpostiosoite|
|Capasity|N|Paikan kapasiteetti|
|PostalCode|N (FK)|Postinumeron id|


### TG_PostalCode
TG_PostalCode sisältää postinumerot. TG_PostalCode on yhteydessä User ja Venue -luokkiin (ManyToOne).

| Kenttä | Tyyppi | Kuvaus |
|--------|--------|--------|
|PostalCode_id|AN (PK)|Postinumeron id|
|PostalCode|C/5|Postinumero|
|City|C/50|Kaupunki|
|Country|C/50|Maa|


### TG_TicketType
TG_TicketType sisältää lipputyypit. TG_TicketType on yhteydessä Ticket -luokkaan (OneToMany).

| Kenttä | Tyyppi | Kuvaus |
|--------|--------|--------|
|TicketType_id|AN (PK)|Lipputyypin id|
|Name|C/100|Lipputyyppi|
|Description|C/1000|Lipputyypin kuvaus|


### TG_UserRole
TG_UserRole sisältää käyttäjän roolit. TG_UserRole on yhteydessä User -luokkaan (ManyToOne).

| Kenttä | Tyyppi | Kuvaus |
|--------|--------|--------|
|UserRole_id|AN (PK)|Käyttäjäroolin id|
|Name|C/100|Käyttäjärooli|
|Description|C/1000|Käyttäjäroolin kuvaus|


## Tekninen kuvaus
- Järjestelmän backend sekä tietokanta toimivat CSC:n rahti palvelun avulla, joka pitää kyseiset osat käynnissä. Järjestelmän client on tällä hetkellä vain saatavilla paikallisesti ajettavana react sovelluksena. 
- Palvelimena toimii edellisessä kohdassa mainittu rahti ympäristö. TicketGuru-järjestelmä on julkaistu sinne tämän Github-repositorion master haaran pohjalta ja järjestelmä päivittyy automaattisesti, kun master haaraan tulee muutoksia.
- Järjestelmän backend on toteutettu Javalla, Spring Bootilla ja MySQL tietokannalla. Järjestelmän client on tehty Reactilla ja Vitellä.
- Käytetyiden teknologioiden versiot: Java 17, React.js 18.2.0, Vite v5.2.8
- REST-rajapinnan kuvaus löytyy järjestelmän [REST-dokumentaatiosta](../TicketGuru/REST%20dokumentaatio/)
- Järjestelmän turvallisuus on toteutettu Spring Securityn Basic Authenticationin avulla. [(Dokumentaatio)](../TicketGuru/REST%20dokumentaatio/Autentikointi.md)
- Järjestelmään on myös toteutettu CORS-konfiguraatio, josta lisää tietoa [CORS-dokumentaatiossa](../TicketGuru/REST%20dokumentaatio/CORS.md)


## Testaus
Projektissa testataan ohjelmistoa jatkuvasti, jotta saadaan varmistettua ohjelmiston toimivuus uusien ominaisuuksien lisäysten tai päivitysten jälkeen. 

Ohjelmistoa testataan eri testityypeillä, joita ovat esimerkiksi: 
* Yksikkötestaus yksittäisiä komponentteja ja niiden toimintaa varten
* Integraatiotestaus uusien ominaisuuksien lisäystä varten
* End to end testaus client puolen käyttöliittymää/sovellusta varten

#### Testauksen teknologiat
- Ohjelmiston yksikkötestit ovat toteutettu Javan JUnit testeinä
- Integraatiotestauksessa on käytetty Spring Bootin tarjoamaa SpringBootTest toiminnallisuutta.
- End to end testit on toteutettu RobotFramework testeinä ja testauksessa on käytetty apuna Selenium-kirjastoa.


## Asennustiedot

### Järjestelmän asennus uuteen kehitysympäristöön
Järjestelmän voi asentaa toiselle koneelle ainakin kahdella eri tavalla:
* Kloonaamalla projektin Github:ista omalle koneelleen
* Lataamalla projektin lähdekoodin zip-tiedostona projektin Github-repositoriosta
* [Projektin Github-repositorio](https://github.com/Santks/Kaaos-Solutions)
* Latauksen jälkeen pura zip-tiedosto haluamaasi hakemistoon koneellasi
* Tämän jälkeen avaa kehitysympäristö ja tuo projektin kansio editoriin

### Järjestelmän asennus uuteen tuotantoympäristöön
1. Valmistelut: Ennen asennuksen aloittamista varmista, että tuotantoympäristö täyttää kaikki järjestelmän vaatimukset, kuten riittävän kapasiteetin, käyttöjärjestelmäversion ja riippuvuuksien asennuksen.

2. Lähdekoodin hankkiminen: Hanki järjestelmän lähdekoodi valitsemallasi tavalla, esimerkiksi kloonaamalla projektin GitHubista tai lataamalla zip-tiedosto. ([Projektin Github-repositorio](https://github.com/Santks/Kaaos-Solutions))

3. Ympäristön asetukset: Määritä tarvittavat ympäristömuuttujat ja konfiguraatiot, kuten tietokantayhteydet ja ulkoiset palvelut, jotka järjestelmä tarvitsee toimiakseen.

4. Riippuvuuksien asennus: Asenna järjestelmän kaikki puuttuvat riippuvuudet. Avaa komentokehote ja navigoi kansioon, jossa projekti on. Projektin kansion löydettyä vaihda sen sisällä "TicketGuru-Client" kansioon ja kirjoita komento *npm install*. Huom! Katso myös, että pom.xml tiedostossa ovat kaikki tarvittavat riippuvuudet.

5. Tietokannan alustaminen: Projektissa on MySQL-tietokanta. TicketGuru-Backend kansion DBSchema.SQL tiedosto alustaa tietokannan, jos sitä ei ole vielä olemassa.

6. Käynnistäminen ja testaus: Käynnistä järjestelmä tuotantoympäristössä ja suorita kattavat testit varmistaaksesi, että asennus onnistui ja järjestelmä toimii odotetusti.

**Virhetilanteiden ilmetessä ota yhteyttä IT-tukeen: kaaossolutions@support.fi**


## Käynnistys- ja käyttöohje

### Käynnistys
- Avaa sovellus osoitteesta [https://santks.github.io/Kaaos-Solutions/](https://santks.github.io/Kaaos-Solutions/)
- Kirjaudu sisään käyttäjällesi 

Sovelluksen käytettävyys on rajoitettu roolien mukaan, joten et ehkä pysty käyttäämään kaikkia toiminnallisuuksia riippuen käyttäjätilisi roolista

- Jos roolisi on *admin*, voit käyttää sovellusta ilman rajoitteita.
- Jos roolisi on *ticket inspector*, voit tarkastaa lippuja.
- Jos roolisi on *manager*, voit hallita ja tarkastella tapahtumia sekä tapahtumapaikkoja.
- Jos roolisi on *seller*, voit tarkastella tapahtumia sekä myydä tai tarkistaa lippuja.
- Jos roolisi on *user*, voit nähdä vain etusivun.

**Kehitys- ja testaustarkoitukseen on määritelty erikseen käyttäjä, jonka saa käyttöön ottamalla yhteyttä IT-tukeen: kaaossolutions@support.fi**