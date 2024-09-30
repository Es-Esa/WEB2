import React, { useState } from "react";
import AddWord from "./AddWord";
import SearchWord from "./SearchWord";

//tässä on tehty funktio App, joka on React-komponentti
//se käyttää Reactin hookseja, useStatea.
//useState-hookin avulla voidaan luoda tilamuuttujia ja päivittää niitä
function App() {
  const [view, setView] = useState("home");

  return (

//tässä on JSX-syntaksia, joka on yhdistelmä JavaScriptiä ja HTML:ää
//JSX mahdollistaa HTML:n käytön React-komponenteissa
    <div>
      <h1>Sanakirjasovellus</h1>
      {view === "home" && (
        <div>
          <button onClick={() => setView("add")}>Lisää uusi sana</button>
          <button onClick={() => setView("search")}>Hae sana</button>
        </div>
      )}
      {view === "add" && <AddWord goHome={() => setView("home")} />}
      {view === "search" && <SearchWord goHome={() => setView("home")} />}
    </div>
  );
}

//exportataan App-komponentti, jotta se voidaan tuoda muualle sovellukseen
export default App;
