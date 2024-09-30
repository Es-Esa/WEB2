import React, { useState } from "react";


//tässä on AddWord-funktio, joka on React-komponentti
//tämä funktio ottaa propsina goHome-funktion ja palauttaa JSX-koodia
function AddWord({ goHome }) {
  const [finnish, setFinnish] = useState("");
  const [english, setEnglish] = useState("");
  const [message, setMessage] = useState("");

  //tämä funktio lähettää uuden sanan palvelimelle
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ finnish, english }),
    });
    const data = await response.json();
    setMessage(data.message);
    setFinnish("");
    setEnglish("");
  };
//tämä funktio palauttaa JSX-koodia ja lisää uuden sanan
  return (
    <div>
      <h2>Lisää uusi sana</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Suomenkielinen sana:</label>
          <input
            type="text"
            value={finnish}
            onChange={(e) => setFinnish(e.target.value)}
          />
        </div>
        <div>
          <label>Englanninkielinen sana:</label>
          <input
            type="text"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
          />
        </div>
        <button type="submit">Lisää</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={goHome}>Takaisin</button>
    </div>
  );
}

export default AddWord;
