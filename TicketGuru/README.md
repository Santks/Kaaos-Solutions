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

### TG_Venue
TG_Venue sisältää tapahtumapaikat. TG_Venuella on OneToMany-viittaus TG_Event-tauluun.
| Kenttä | Tyyppi | Kuvaus |
| Venue_id | AN | Tapahtumapaikan id |
| Name | C | Tapahtumapaikan nimi |

### TG_Event
TG_Event sisältää tapahtumat. TG_Eventista on ManyToMany-viittaus TG_TicketEvent- ja TG_EventOrganiser-tauluihin sekä OneToOne-viittaukset TG_EventStatus- ja TG_EventCategory-tauluihin.
**tähän atribuutit taulukkona**

### TG_Organiser
TG_Organiser sisältää tapahtumien järjestäjät. TG_Organiserilla on ManyToMany-viittaus TG_EventOrganiser-tauluun.
**tähän atribuutit taulukkona**

### TG_Payment
TG_Payment sisältää maksutiedot. TG_Paymentilla on ManyToOne-viittaus TG_User-tauluun.
**tähän atribuutit taulukkona**

### TG_Ticket
TG_Ticket sisältää myytävät liput. TG_Ticketilla on ManyToMany-viittaus TG_TicketEvent-tauluun sekä ManyToOne-viittaukset TG_TicketType- ja TG_Order-tauluihin.
**tähän atribuutit taulukkona**

### TG_TicketType
TG_TicketType sisältää eri lipputyypit. TG_TicketTypella on OneToMany-viittaus TG_Ticket-tauluun.
**tähän atribuutit taulukkona**

### TG_Order
TG_Order sisältää tilaukset. TG_Orderilla on OneToMany-viittaus TG_Ticket-tauluun ja ManyToOne-viittaukset TG_User- ja TG_Payment-tauluihin.
**tähän atribuutit taulukkona**

### TG_TicketEvent
TG_TicketEvent yhdistää liput ja tapahtumat välitauluksi. TG_TicketEventilla on ManyToOne-viittaukset TG_Ticket- ja TG_Event-tauluihin.
**tähän atribuutit taulukkona**

### TG_UserRole
TG_UserRole sisältää käyttäjien roolit. TG_UserRolella on OneToMany-viittaus TG_User-tauluun.
**tähän atribuutit taulukkona**

### TG_User
TG_User sisältää käyttäjät. TG_Userilla on OneToMany-viittaukset TG_Order- ja TG_Payment-tauluihin sekä ManyToOne-viittaukset TG_UserRole- ja TG_PostalCode-tauluihin.
**tähän atribuutit taulukkona**

### TG_PostalCode
TG_PostalCode sisältää postinumerot. TG_PostalCodella on OneToMany-viittaukset TG_User- ja TG_Venue-tauluihin.
**tähän atribuutit taulukkona**

### TG_EventOrganiser
TG_EventOrganiser yhdistää tapahtumat ja järjestäjät. TG_EventOrganiserilla on ManyToOne-viittaukset TG_Organiser- ja TG_Event-tauluihin.
**tähän atribuutit taulukkona**

### TG_EventStatus
TG_EventStatus sisältää tapahtumien statuksen. TG_EventStatusilla on OneToOne-viittaus TG_Event-tauluun.
**tähän atribuutit taulukkona**

### TG_EventCategory
TG_EventCategory sisältää tapahtumakategoriat. TG_EventCategorylla on OneToOne-viittaus TG_Event-tauluun.
**tähän atribuutit taulukkona**


## Tekninen kuvaus
Teknisessä kuvauksessa esitetään järjestelmän toteutuksen suunnittelussa tehdyt tekniset ratkaisut, esim.

- Missä mikäkin järjestelmän komponentti ajetaan (tietokone, palvelinohjelma) ja komponenttien väliset yhteydet ([esimerkki](https://security.ufl.edu/it-workers/risk-assessment/creating-an-information-systemdata-flow-diagram/))
- Palvelintoteutuksen yleiskuvaus: teknologiat, deployment-ratkaisut yms.
- Keskeisten rajapintojen kuvaukset, esimerkit REST-rajapinta. Tarvittaessa voidaan rajapinnan käyttöä täsmentää UML-sekvenssikaavioilla.
- Toteutuksen yleisiä ratkaisuja, esim. turvallisuus.

### Tämän lisäksi
- ohjelmakoodin tulee olla kommentoitua
- luokkien, metodien ja muuttujien tulee olla kuvaavasti nimettyjä ja noudattaa johdonmukaisia nimeämiskäytäntöjä
- ohjelmiston pitää olla organisoitu komponentteihin niin, että turhalta toistolta vältytään

## Testaus
Tässä kohdin selvitetään, miten ohjelmiston oikea toiminta varmistetaan testaamalla projektin aikana: millaisia testauksia tehdään ja missä vaiheessa. Testauksen tarkemmat sisällöt ja testisuoritusten tulosten raportit kirjataan erillisiin dokumentteihin.

Tänne kirjataan myös lopuksi järjestelmän tunnetut ongelmat, joita ei ole korjattu.

## Asennustiedot
Järjestelmän asennus on syytä dokumentoida kahdesta näkökulmasta:

- Järjestelmän kehitysympäristö: miten järjestelmän kehitysympäristön saisi rakennettua johonkin toiseen koneeseen
- Järjestelmän asentaminen tuotantoympäristöön: miten järjestelmän saisi asennettua johonkin uuteen ympäristöön.

Asennusohjeesta tulisi ainakin käydä ilmi, miten käytettävä tietokanta ja käyttäjät tulee ohjelmistoa asentaessa määritellä (käytettävä tietokanta, käyttäjätunnus, salasana, tietokannan luonti yms.).

## Käynnistys- ja käyttöohje
Tyypillisesti tässä riittää kertoa ohjelman käynnistykseen tarvittava URL sekä mahdolliset kirjautumiseen tarvittavat tunnukset. Jos järjestelmän käynnistämiseen tai käyttöön liittyy joitain muita toimenpiteitä tai toimintajärjestykseen liittyviä asioita, nekin kerrotaan tässä yhteydessä.

Usko tai älä, tulet tarvitsemaan tätä itsekin, kun tauon jälkeen palaat järjestelmän pariin!