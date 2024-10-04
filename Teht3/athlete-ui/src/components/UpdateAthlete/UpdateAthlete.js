import React, { useContext, useState, useEffect } from 'react';
import { AthleteContext } from '../../context/AthleteContext';
import './UpdateAthlete.css';

// UpdateAthlete komponentti, joka päivittää urheilijan tiedot
const UpdateAthlete = ({ athlete, onClose }) => {
    const { updateAthlete } = useContext(AthleteContext);
    const [updatedAthlete, setUpdatedAthlete] = useState(athlete);

    // useEffect-funktio, tämä päivittää urheilijan tiedot kun urheilija muuttuu
    useEffect(() => {
        setUpdatedAthlete(athlete);
    }, [athlete]);

    // handleChange-funktio, tämä päivittää urheilijan tiedot kun niitä muutetaan
    const handleChange = e => {
        setUpdatedAthlete({ ...updatedAthlete, [e.target.name]: e.target.value });
    };

    // handleSubmit-funktio, tämä päivittää urheilijan tiedot kun lomake lähetetään
    const handleSubmit = async e => {
        e.preventDefault();

        // Tarkistetaan, että kaikki kentät on täytetty
        try {
            // Call the updateAthlete function from context directly
            await updateAthlete(updatedAthlete.id, updatedAthlete);
            onClose(); // Close the form/modal after successful update
        } catch (error) {
            console.error('Error updating athlete:', error);
        }
    };

    // Bootstrapilla tehty lomake, jossa kentät urheilijan päivittämistä varten
    return (
        <div className="container mt-4">
            <h2>Päivitä urheilija</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nimi</label>
                    <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        value={updatedAthlete.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Sukunimi</label>
                    <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        value={updatedAthlete.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Kutsumanimi</label>
                    <input
                        type="text"
                        name="nickname"
                        className="form-control"
                        value={updatedAthlete.nickname}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Syntynyt</label>
                    <input
                        type="date"
                        name="birthDate"
                        className="form-control"
                        value={updatedAthlete.birthDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Paino</label>
                    <input
                        type="number"
                        name="weight"
                        className="form-control"
                        value={updatedAthlete.weight}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Kuvan URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        className="form-control"
                        value={updatedAthlete.imageUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Laji</label>
                    <input
                        type="text"
                        name="sport"
                        className="form-control"
                        value={updatedAthlete.sport}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Saavutukset</label>
                    <textarea
                        name="achievements"
                        className="form-control"
                        value={updatedAthlete.achievements}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary button-spacing mt-3">Päivitä urheilija</button>
                <button type="button" className="btn btn-secondary button-spacing mt-3 ml-2" onClick={onClose}>
                    Peruuta
                </button>
            </form>
        </div>
    );
};

// Viedään (export) UpdateAthlete komponentti App.js-tiedostoon
export default UpdateAthlete;
