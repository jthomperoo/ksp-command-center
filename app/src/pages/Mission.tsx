import BodyTargeting from '../components/BodyTargeting';
import Navball from '../components/Navball';
import OrbitalMap from '../components/OrbitalMap';
import Overview from '../components/Overview';
import Staging from '../components/Staging';
import VesselTargeting from '../components/VesselTargeting';

function Mission() {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
            }}
        >
            <Overview />
            <Staging />
            <Navball />
            <OrbitalMap />
            <BodyTargeting />
            <VesselTargeting />
        </div>
    );
}

export default Mission;
