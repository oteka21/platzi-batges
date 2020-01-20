import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import './global.css';
import App from './components/App';

console.log('un cambio para que cambie por que toca que cambie')

const container = document.getElementById('app');

ReactDOM.render(<App />, container);
