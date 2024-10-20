import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'tuicss/dist/tuicss.css';
import App from './App.tsx';
import './main.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
