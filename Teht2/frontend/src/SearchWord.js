import React, { useState } from "react";

//tässä on tehty funktio SearchWord, joka on React-komponentti
//tämä funktio ottaa propsina goHome-funktion ja palauttaa JSX-koodia
//SearchWord-komponentti käyttää Reactin hookseja, useStatea.
function SearchWord({ goHome }) {
  const [finnish, setFinnish] = useState("");
  const [translation, setTranslation] = useState(null);
  const [error, setError] = useState("");


  //tämä funktio hakee sanan ja käännöksen
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/translate/${finnish}`
      );
      if (response.ok) {
        const data = await response.json();
        setTranslation(data.english);
        setError("");
      } else {
        setTranslation(null);
        setError("Sanaa ei löytynyt");
      }
    } catch (error) {
      setError("Virhe haussa"); //virheilmoitus jos tulee virhe hakiessa.
    }
  };

  return (
    //html koodia JSX-syntaksilla
    <div>
      <h2>Hae sana</h2>
      <div>
        <input
          type="text"
          value={finnish}
          onChange={(e) => setFinnish(e.target.value)}
        />
        <button onClick={handleSearch}>Hae</button>
      </div>
      {translation && (
        <p>
          Suomenkielinen sana: {finnish} <br />
          Englanninkielinen vastine: {translation}
        </p>
      )}
      {error && <p>{error}</p>}
      <button onClick={goHome}>Takaisin</button>
    </div>
  );
}

export default SearchWord;
