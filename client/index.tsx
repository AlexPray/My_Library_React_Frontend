import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use test

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);