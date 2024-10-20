import Crew from '../components/Crew';
import Flight from '../components/Flight';
import Graph from '../components/Graph';
import Navball from '../components/Navball';
import Signal from '../components/Signal';

function Capcom() {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
            }}
        >
            <Navball />
            <Crew />
            <Signal />
            <Graph />
            <Flight />
        </div>
    );
}

export default Capcom;
