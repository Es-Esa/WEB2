const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json()); //jotta voidaan käyttää req.body -tietoja json-muodossa
app.use(express.urlencoded({ extended: true })); 

//CROSS HEADERS

//tämä on funktio, joka asettaa CORS-headersit ja kutsuu seuraavaa middlewarea
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Accept, Content-Type");
    res.setHeader("Content-type", "application/json");
    next();
});   

//luetaan tiedosto sanakirja.txt ja palautetaan se json-muodossa
function readDictionary() {
    const data = fs.readFileSync("./sanakirja.txt", { encoding: "utf8", flag: "r" });
    const lines = data.split(/\r?\n/);
    const dictionary = {};
    lines.forEach((line) => {
      const words = line.split(" ");
      if (words.length === 2) {
        dictionary[words[0]] = words[1]; // Finnish word as key, English word as value
      }
    });
    return dictionary;
  }

  //hae sanat ja kielimuutokset
  app.get("/translate/:finnishWord", (req, res) => {
    const finnishWord = req.params.finnishWord;
    const dictionary = readDictionary();
    const englishWord = dictionary[finnishWord];
  //jos sana löytyy, palautetaan se json-muodossa, jos ei löydy, palautetaan virheilmoitus
    if (englishWord) {
      res.json({ finnish: finnishWord, english: englishWord });
    } else {
      res.status(404).json({ message: "Sanaa ei löytynyt sanakirjasta" });
    }
  });

  //uuden sanan lisääminen
  app.post("/add", (req, res) => {
    const { finnish, english } = req.body;

    if (!finnish || !english) {
        return res.status(400).json({ message: "Tarvitaan molemmat sanat, suomeksi ja englanniksi" });
    }

    const dictionary = readDictionary(); // Lukee sanakirjaa
    if (dictionary[finnish]) {
        return res.status(400).json({ message: "Sana löytyy jo sanakirjasta" }); // tarkistaa onko sana jo olemassa
    }

    const newEntry = `${finnish} ${english}\n`;
    fs.appendFileSync("./sanakirja.txt", newEntry, { encoding: "utf8" });
    res.status(201).json({ message: "Molemmat sanat lisätty", finnish, english });
});


//kuunnellaan porttia 3000, eli tulostetaan "Serveri toimii portissa 3000" ja käynnistetään serveri
app.listen(3000, () => {
    console.log("Serveri toimii portissa 3000");
});