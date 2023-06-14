import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
<BrowserRouter>
    <App />
</BrowserRouter>
);
