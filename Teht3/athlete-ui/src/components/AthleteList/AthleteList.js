
import React, { useContext, useState } from 'react';
import { AthleteContext } from '../../context/AthleteContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faWeight, faTrophy, faCalendar, faEdit } from '@fortawesome/free-solid-svg-icons';
import UpdateAthlete from '../UpdateAthlete/UpdateAthlete';
import './AthleteList.css';


// AthleteList-komponentti, joka näyttää urheilijat ja niiden tiedot sekä mahdollisuuden poistaa ja muokata urheilijaa
const AthleteList = () => {
    const { athletes, deleteAthlete } = useContext(AthleteContext);
    const [selectedAthlete, setSelectedAthlete] = useState(null); // Tämä on useState-funktio, joka asettaa selectedAthlete-muuttujan arvon
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Haluatko varmasti poistaa tämän urheilijan?"); // Kysyy käyttäjältä varmistuksen poistosta
        if (confirmDelete) {
            deleteAthlete(id);
        }
    };

    const handleEdit = (athlete) => {
        setSelectedAthlete(athlete); // tämä asettaa selectedAthlete-muuttujan arvon
    };

    const closeUpdate = () => {
        setSelectedAthlete(null); // sulkee UpdateAthlete komponentin
    };


    // Bootstrapilla tehty lista, joka näyttää urheilijat ja niiden tiedot sekä mahdollisuuden poistaa ja muokata urheilijaa
    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Urheilijat</h2>
            <ul className="list-group">
                {athletes.map(athlete => (
                    <li key={athlete.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            {athlete.imageUrl && (
                                <img src={athlete.imageUrl} alt={athlete.nickname} className="rounded-circle" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                            )}
                            <div>
                                <h5 className="mb-1">{athlete.firstName} {athlete.lastName}</h5>
                                <p className="mb-0">{athlete.nickname} | <strong>{athlete.sport}</strong></p>
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-left">
                            <div>
                                <FontAwesomeIcon icon={faWeight} className="mr-1" /> {athlete.weight} kg
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faTrophy} className="mr-1" /> {athlete.achievements}
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faCalendar} className="mr-1" /> {new Date(athlete.birthDate).toLocaleDateString()}
                            </div>
                            
                            <div className="d-flex mt-2">
                                <button className="btn btn-danger button-spacing" onClick={() => handleDelete(athlete.id)}>
                                    <FontAwesomeIcon icon={faTrash} /> Poista
                                </button>
                                <button className="btn btn-warning" onClick={() => handleEdit(athlete)}>
                                    <FontAwesomeIcon icon={faEdit} /> Muokkaa
                                </button>
                            </div>

                        </div>
                    </li>
                ))}
            </ul>
            
            {selectedAthlete && (
                <UpdateAthlete athlete={selectedAthlete} onClose={closeUpdate} />
            )}
        </div>
    );
};

// Viedään (export) komponentti App.js-tiedostoon
export default AthleteList;
