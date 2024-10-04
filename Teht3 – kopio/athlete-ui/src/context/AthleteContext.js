//Athletecontext on konteksti, joka tarjoaa urheilijoiden tiedot ja toiminnot urheilijoiden lisäämiseen, päivittämiseen ja poistamiseen tietokannasta.
import React, { createContext, useState, useEffect } from 'react'; 
import axios from 'axios';


// Luo AthleteContext, joka on createContext-funktio, joka luo uuden kontekstin

export const AthleteContext = createContext();
// AthleteProvider-funktio, joka luo uuden kontekstin tarjoajan
export const AthleteProvider = ({ children }) => {
    const [athletes, setAthletes] = useState([]);

    // useEffect-funktio, joka hakee urheilijat tietokannasta
    useEffect(() => {
        axios.get('http://localhost:5000/api/athletes')
            .then(response => setAthletes(response.data))
            .catch(error => console.error(error));
    }, []);

    // addAthlete-funktio, joka lisää uuden urheilijan tietokantaan
    const addAthlete = async (athlete) => {
        const response = await axios.post('http://localhost:5000/api/athletes', athlete);
        setAthletes(prevAthletes => [...prevAthletes, response.data]);
    };

    // updateAthlete-funktio, joka päivittää urheilijan tiedot tietokantaan
    const updateAthlete = async (id, updatedAthlete) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/athletes/${id}`, updatedAthlete);
            setAthletes(prevAthletes => 
                prevAthletes.map(athlete => 
                    athlete.id === id ? response.data : athlete
                )
            );
        } catch (error) {
            console.error('Tapahtui virhe, kun yrtitettiin päivittää:', error);
        }
    };
    // deleteAthlete-funktio, joka poistaa urheilijan tietokannasta
    const deleteAthlete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/athletes/${id}`);
            setAthletes(prevAthletes => prevAthletes.filter(athlete => athlete.id !== id));
        } catch (error) {
            console.error('Tapahtui virhe, kun yrtitettiin poistaa:', error);
        }
    };

    return (
        <AthleteContext.Provider value={{ athletes, addAthlete, updateAthlete, deleteAthlete }}>
            {children}
        </AthleteContext.Provider>
    );
};