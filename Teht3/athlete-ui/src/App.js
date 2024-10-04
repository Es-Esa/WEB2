import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AthleteProvider } from './context/AthleteContext';
import AthleteList from './components/AthleteList/AthleteList';
import AddAthlete from './components/AddAthlete/AddAthlete';

function App() {
    return (
        <AthleteProvider>
            <div className="App">
                <div className="container">
                    <h1 className="mt-4">Urheilija manageri</h1>
                    <AddAthlete />
                    <AthleteList />
                </div>
            </div>
        </AthleteProvider>
    );
}

export default App;
