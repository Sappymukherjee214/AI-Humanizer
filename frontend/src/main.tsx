import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// --- Console Noise Filter ---
// This suppresses warnings and errors injected by browser extensions 
// (like Amplitude, Sentry, and API Recorders) to keep your console clean.
const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args) => {
    if (typeof args[0] === 'string' && (args[0].includes('Amplitude') || args[0].includes('Recorder'))) return;
    originalWarn(...args);
};

console.error = (...args) => {
    if (typeof args[0] === 'string' && (args[0].includes('sentry.io') || args[0].includes('Recorder'))) return;
    originalError(...args);
};
// ----------------------------

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
