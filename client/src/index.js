import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

//Contexts
import { UserContext } from "./store/UserContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserContext>
                <App />
            </UserContext>
        </BrowserRouter>
    </React.StrictMode>
);
