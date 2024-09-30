import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


//perus React-komponentti, joka renderöi App-komponentin
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
