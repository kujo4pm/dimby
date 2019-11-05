import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { config as dotenvConfig } from 'dotenv';
import * as serviceWorker from './serviceWorker';

dotenvConfig();
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
