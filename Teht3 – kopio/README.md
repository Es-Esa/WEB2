# Vaiheet

## Athlete-api luominen

- Uuden kansion luominen athlete-api
- npm init -y
- npm install express mariadb body-parser cors   <-Nämä asensin->

Asensin mariadb ja loin tietokannan mariadb

Tässä luontiscripti.

```
-- Dumping database structure for sports_db
CREATE DATABASE IF NOT EXISTS `sports_db` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `sports_db`;

-- Dumping structure for taulu sports_db.athletes
CREATE TABLE IF NOT EXISTS `athletes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `nickname` varchar(100) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `sport` varchar(100) DEFAULT NULL,
  `achievements` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
```

#### server.js luominen ja Expressovelluksen luominen.

#### Käytin asennettuja moduuleita:

```
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mariadb = require('mysql2'); 
```


#### Määritin mariadb:n yhteyden
#### Loin tarkistuksen, että se varmistaa että se otti yhteyttä siihen:

```
// Yhteyden tarkistus
db.connect(err => {
    if (err) {
        console.log('Virhe, ei yhdistnyt:', err);
    } else {
        console.log('Yhdistynyt MariaDB');
    }
});
```

#### Rest rajapinnan toteutus:

> /api/athletes (get methodilla) joka hakee kaikki urheilijat tietokannasta
> /api/athletes:id joka hakee yksittäistä urheiljaa ID perusteella
> /api/athletes (post methodilla) joka lisää urheilijan
> /api/athletes/:id (put method) päivittää urhelijat id:perusteella
> /api/athletes/:id (delete method) poistaa urheilijan id:perusteella
> 
#### lopuksi palvelimen käynnistys.


## Athlete-ui

- loin uuden projektin 
- npx create-react-app athlete-ui
- npm install axios bootstrap (asennetut moduulit)

#### loin seuraavat kansiot (Selkeämmän kansio struktuuriin):
```
src/
├── components/
│   ├── AddAthlete/
│   │   └── AddAthlete.js
│   ├── AthleteList/
│   │   ├── AthleteList.js
│   │   └── AthleteList.css
│   └── UpdateAthlete/
│       ├── UpdateAthlete.js
│       └── UpdateAthlete.css
├── context/
│   └── AthleteContext.js
└── App.js
```

- Muutos App.js: Importtasin tekemäni js tiedostot.
- npm run projektin aloittamiseksi ja testaamiseksi.
- AthleteContext.js

> Athletecontext on konteksti, joka tarjoaa urheilijoiden tiedot ja toiminnot urheilijoiden lisäämiseen, päivittämiseen ja poistamiseen tietokannasta.
> Käyttää reactia, createContextia, useStatea ja useEffectia jotta voidaan luoda AthleteContext ja AthleteProvider funktiot

```
import React, { createContext, useState, useEffect } from 'react'; 
import axios from 'axios';
```


Loin funktiot jotka hakee, päivittää, poistaa, tai luo uuden urheilijan
Myös lisäsin Error handlereitä.
Paremmin selitetty koodin kommenteissa.


#### component/AthletList

> Tämä komponentti näyttää kaikki urheilijat ja niiden tiedot, sekä mahdollisuuden poistaa ja muokata urheilijaa
> Tein kompoinentin joka näyttää kaikki urheilijat tietokannasta.
> Tulostaa näytölle boostrap ja FontAwesomeIcon käyttäen tyylitetty sivu, minun makuun.
> Tämä komponentti sisältää myös napit jolla voidaan joki poistaa tai muokata.
> Poistamiseen lisäsin varmistuksen että käyttäjä olisi täysin varma toiminnasta.
> 
Käytin tyylitykseen:
```
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faWeight, faTrophy, faCalendar, faEdit } from '@fortawesome/free-solid-svg-icons';
```

> joka asensin npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome


#### component/AddAthlete

Lisää uuden urheilijan

#### component/UpadteAthlete

Päivittää urheilijan


### Loppu testailua

- Sain yhteys virheita tietokantaa, kun yritin lisätä urheilijan. En löytänyt mikä olisi virheen aiheuttanut, koodi vaikutti oikein toimivalta.
- Käynnistin express palvelimen uudelleen ja virhe ei enään toistunut. Kaikki toimi miten piti. 


```
Virhekoodi: {
	"Status": "500Internal Server Error",
	"Version": "HTTP/1.1",
	"Transferred": "402 B (115 B size)",
	"Referrer Policy": "strict-origin-when-cross-origin",
	"Request Priority": "Highest",
	"DNS-selvitys": "Järjestelmä"
}
```

Mikä viittaa server side ongelmaan.

### Lisää

Koodi on yritetty kommentoida selkeästi ja ymmärrettävästi.



