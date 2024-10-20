import Control from '../components/Control';
import DirectionControl from '../components/DirectionControl';
import Flight from '../components/Flight';
import Navball from '../components/Navball';
import Target from '../components/Target';

function Fido() {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
            }}
        >
            <Control />
            <Navball />
            <DirectionControl />
            <Flight />
            <Target />
        </div>
    );
}

export default Fido;
