import useFlight from '../hooks/Flight';
import NoSignal from './NoSignal';

function InstrumentControl() {
    const { data, setAntennas, setCargoBays, setRadiators, setSolarPanels } =
        useFlight();

    if (data.vessel === undefined) {
        return (
            <div
                className='tui-window'
                style={{
                    flexGrow: 1,
                    height: '100%',
                }}
            >
                <fieldset className='tui-fieldset'>
                    <legend>Instrument Control</legend>
                    <NoSignal />
                </fieldset>
            </div>
        );
    }

    const toggleAntennas = () => {
        if (data.vessel === undefined) {
            return;
        }

        setAntennas(!data.vessel.antennas);
    };

    const toggleCargoBays = () => {
        if (data.vessel === undefined) {
            return;
        }

        setCargoBays(!data.vessel.cargoBays);
    };

    const toggleRadiators = () => {
        if (data.vessel === undefined) {
            return;
        }

        setRadiators(!data.vessel.radiators);
    };

    const toggleSolarPanels = () => {
        if (data.vessel === undefined) {
            return;
        }

        setSolarPanels(!data.vessel.solarPanels);
    };

    return (
        <div
            className='tui-window'
            style={{
                flexGrow: 1,
            }}
        >
            <fieldset className='tui-fieldset'>
                <legend>Instrument Control</legend>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '8px',
                    }}
                >
                    <label className='tui-checkbox'>
                        Antennas
                        <input
                            type='checkbox'
                            checked={data.vessel.antennas}
                            onChange={toggleAntennas}
                        />
                        <span />
                    </label>
                    <label className='tui-checkbox'>
                        Cargo Bays
                        <input
                            type='checkbox'
                            checked={data.vessel.cargoBays}
                            onChange={toggleCargoBays}
                        />
                        <span></span>
                    </label>
                    <label className='tui-checkbox'>
                        Radiators
                        <input
                            type='checkbox'
                            checked={data.vessel.radiators}
                            onChange={toggleRadiators}
                        />
                        <span></span>
                    </label>
                    <label className='tui-checkbox'>
                        Solar Panels
                        <input
                            type='checkbox'
                            checked={data.vessel.solarPanels}
                            onChange={toggleSolarPanels}
                        />
                        <span></span>
                    </label>
                </div>
            </fieldset>
        </div>
    );
}

export default InstrumentControl;
