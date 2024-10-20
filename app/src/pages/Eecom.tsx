import Actions from '../components/Actions';
import InstrumentControl from '../components/InstrumentControl';
import OrbitalMap from '../components/OrbitalMap';
import Resources from '../components/Resources';

function Eecom() {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
            }}
        >
            <Resources />
            <InstrumentControl />
            <Actions />
            <OrbitalMap />
        </div>
    );
}

export default Eecom;
