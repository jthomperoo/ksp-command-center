import { useContext } from 'react';
import { FlightContext } from '../context/Flight';

function useFlight() {
    const context = useContext(FlightContext);

    if (!context)
        throw new Error('FlightContext must be placed within FlightProvider');

    return context;
}

export default useFlight;
