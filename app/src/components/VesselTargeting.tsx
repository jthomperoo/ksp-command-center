import useFlight from '../hooks/Flight';
import NoSignal from './NoSignal';

function VesselTargeting() {
    const { data, setTargetVessel } = useFlight();

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
                    <legend>Vessel Targeting</legend>
                    <NoSignal />
                </fieldset>
            </div>
        );
    }

    const changeTargetVessel = (target: number | undefined) => {
        setTargetVessel(target);
    };

    const targetVessel = data.vessel.targetVessel;

    return (
        <div
            className='tui-window'
            style={{
                flexGrow: 1,
            }}
        >
            <fieldset className='tui-fieldset'>
                <legend>Vessel Targeting</legend>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '16px',
                    }}
                >
                    <label className='tui-radio'>
                        No Target
                        <input
                            type='radio'
                            checked={targetVessel === null}
                            onChange={() => changeTargetVessel(undefined)}
                        />
                        <span></span>
                    </label>
                    {data.vessels.map((vessel) => (
                        <label key={vessel.index} className='tui-radio'>
                            {vessel.name}
                            <input
                                type='radio'
                                checked={targetVessel === vessel.index}
                                onChange={() =>
                                    changeTargetVessel(vessel.index)
                                }
                            />
                            <span></span>
                        </label>
                    ))}
                </div>
            </fieldset>
        </div>
    );
}

export default VesselTargeting;
