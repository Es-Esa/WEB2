import React, { useContext, useState } from 'react';
import { AthleteContext } from '../../context/AthleteContext';


// AddAthlete komponentti, joka lisää uuden urheilijan
const AddAthlete = () => {
    const { addAthlete } = useContext(AthleteContext);
    
    const [newAthlete, setNewAthlete] = useState({
        firstName: '',
        lastName: '',
        nickname: '',
        birthDate: '',
        weight: '',
        imageUrl: '',
        sport: '',
        achievements: ''
    });

    const [error, setError] = useState(''); //tämä on setState-funktio, joka asettaa error-muuttujan arvon

    const handleChange = e => {
        setNewAthlete({ ...newAthlete, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Tarkistetaan, että kaikki kentät on täytetty
        if (!newAthlete.firstName || !newAthlete.lastName || !newAthlete.nickname ||
            !newAthlete.birthDate || !newAthlete.weight || !newAthlete.imageUrl || 
            !newAthlete.sport || !newAthlete.achievements) {
            setError('Kaikki kentät ovat pakollisia.'); // Antaa virheen jos kenttiä ei ole täytetty
            return; // Lopettaa funktion suorituksen
        }

        setError(''); // Tyhjentää virheen
        addAthlete(newAthlete); // Lisää uusi urheilija
        setNewAthlete({ //  Tyhjentää kentät
            firstName: '',
            lastName: '',
            nickname: '',
            birthDate: '',
            weight: '',
            imageUrl: '',
            sport: '',
            achievements: ''
        });
    };


    //boostrapilla tehty lomake, jossa kentät urheilijan lisäämistä varten
    return (
        <div className="container mt-4">
            <h2>Lisää urheilija</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>} {/* Virheen output */}
                
                <div className="form-group">
                    <label>Nimi</label>
                    <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        value={newAthlete.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Sukunimi</label>
                    <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        value={newAthlete.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Kutsumanimi</label>
                    <input
                        type="text"
                        name="nickname"
                        className="form-control"
                        value={newAthlete.nickname}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Syntynyt</label>
                    <input
                        type="date"
                        name="birthDate"
                        className="form-control"
                        value={newAthlete.birthDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Paino</label>
                    <input
                        type="number"
                        name="weight"
                        className="form-control"
                        value={newAthlete.weight}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Kuvan URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        className="form-control"
                        value={newAthlete.imageUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Laji</label>
                    <input
                        type="text"
                        name="sport"
                        className="form-control"
                        value={newAthlete.sport}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Saavutukset</label>
                    <textarea
                        name="achievements"
                        className="form-control"
                        value={newAthlete.achievements}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Lisää urheilija</button>
            </form>
        </div>
    );
};

// Viedään AddAthlete komponentti App.js tiedostoon
export default AddAthlete;
