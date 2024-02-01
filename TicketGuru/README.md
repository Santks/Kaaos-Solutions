# TicketGuru – Kaaos Solutions
Tiimi: Ilja Haapanen, Leonid Petrov, Sampsa Loukkola, Santeri Kuronen


## Johdanto
Projektin tarkoituksena on tuottaa TicketGuru -lipunmyyntijärjestelmä. Asiakkaana on lipputoimisto, joka on tilannut lipunmyyntijärjestelmän lippujen myymiseen myyntipisteessään. Alustava nimi järjestelmälle on TicketGuru.

Asiakas, eli lipputoimisto, määrittelee TicketGurussa tapahtumat, joihin lippuja myydään. Sovelluksella hallinnoidaan ja seurataan lipunmyyntiä. Lipunmyyjät ja toimiston henkilökunta käyttävät sovellusta, asiakkaat eivät voi ostaa lippuja suoraan järjestelmästä omatoimisesti. Tapahtumia voi lisätä, muokata ja niihin voi luoda erilaisia lipputyyppejä.
Lippuja pitää voida myydä ja tulostaa, ja lippujen on sisällettävä helposti tarkastettava yksilöivä koodi, jotta lippu voidaan varmentaa aidoksi sekä merkitä käytetyksi. Ennakkomyynnin jälkeen jäljellä olevat liput tulee pystyä tulostamaan, jotta ne voidaan myydä ovella.

Myytyjen lippujen määrää voidaan seurata raporteilta tapahtumakohtaisesti. Järjestelmä on tarkoitettu käytettäväksi selaimen kautta päätteellä, ja sen on tarkoitus olla täysin responsiivinen ja selainriippumaton.

Asiakkaan tarkoituksena on jatkokehittää ja laajentaa palveluitaan myös verkkokaupan suuntaan, mutta se ei ole osa tätä projektia.


## Järjestelmän määrittely
Lipunmyyntijärjestelmä on määritelty erikseen käyttäjäryhminä, käyttäjätarinoina sekä käyttötapauskaaviona.


### Käyttäjäryhmät
**Tilaaja / Tuoteomistaja**
- Lipputoimisto, joka on tilannut lipumyyntijärjestelmän

**Pääkäyttäjä**
- Pääkäyttäjä voi lisätä, muokata sekä poistaa käyttäjäoikeuksia

**Ylläpitäjä**
- Ylläpitäjä syöttää järjestelmään tapahtumia

**Myyjä**
- Myyjä lisää järjestelmään tilauksia ja tarkastaa lippuja

**Asiakas**
- Asiakas ostaa lipun tiettyyn tapahtumaan


### Käyttäjätarinat
Käyttäjätarinat löytyvät projektin SCRUM-taulun vasemmasta laidasta. [Linkki tauluun](https://github.com/users/Santks/projects/3/views/1).


### Käyttötapauskaavio
- Kuva tulee tähän


## Käyttöliittymä
Esitetään käyttöliittymän tärkeimmät (vain ne!) näkymät sekä niiden väliset siirtymät käyttöliittymäkaaviona.

Jos näkymän tarkoitus ei ole itsestään selvä, se pitää kuvata lyhyesti.

## Tietokanta
Järjestelmään säilöttävät ja siinä käsiteltävät tiedot ja niiden väliset suhteet kuvataan käsitekaaviolla. Käsitemalliin sisältyy myös taulujen välisten viiteyhteyksien ja avainten määritykset. Tietokanta kuvataan käyttäen jotain kuvausmenetelmää, joko ER-kaaviota ja UML-luokkakaaviota.

Lisäksi kukin järjestelmän tietoelementti ja sen attribuutit kuvataan tietohakemistossa. Tietohakemisto tarkoittaa yksinkertaisesti vain jokaisen elementin (taulun) ja niiden attribuuttien (kentät/sarakkeet) listausta ja lyhyttä kuvausta esim. tähän tyyliin:

### Tilit
Tilit-taulu sisältää käyttäjätilit. Käyttäjällä voi olla monta tiliä. Tili kuuluu aina vain yhdelle käyttäjälle.

| Kenttä      | Tyyppi          | Kuvaus                           |
|-------------|-----------------|----------------------------------|
| id          | int PK          | Tilin id                         |
| nimimerkki  | varchar(30)     | Tilin nimimerkki                 |
| avatar      | int FK          | Tilin avatar, viittaus avatar-tauluun |
| kayttaja    | int FK          | Viittaus käyttäjään käyttäjä-taulussa |

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