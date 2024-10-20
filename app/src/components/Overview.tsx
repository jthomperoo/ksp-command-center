import { VesselSituation } from '../DataUpdate';
import useFlight from '../hooks/Flight';
import NoSignal from './NoSignal';

const massFormatter = Intl.NumberFormat('en', {
    maximumFractionDigits: 0,
    style: 'unit',
    unit: 'kilogram',
    unitDisplay: 'short',
});

function getSituationName(situation: VesselSituation) {
    switch (situation) {
        case 'docked':
            return 'Docked at';
        case 'escaping':
            return 'Escaping ';
        case 'flying':
            return 'Flying on ';
        case 'landed':
            return 'Landed at ';
        case 'orbiting':
            return 'Orbiting around ';
        case 'pre_launch':
            return 'Pre-Launch at ';
        case 'splashed':
            return 'Splashed Down at ';
        case 'sub_orbital':
            return 'Sub-Orbital at ';
    }
}

function Overview() {
    const { data } = useFlight();

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
                    <legend>Overview</legend>
                    <NoSignal />
                </fieldset>
            </div>
        );
    }

    return (
        <div
            className='tui-window'
            style={{
                flexGrow: 1,
            }}
        >
            <fieldset className='tui-fieldset'>
                <legend>Overview</legend>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <fieldset
                        className='tui-fieldset tui-border-dashed'
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        <legend>Name</legend>
                        {data.vessel.name}
                    </fieldset>
                    <fieldset
                        className='tui-fieldset tui-border-dashed'
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        <legend>Status</legend>
                        {getSituationName(data.vessel.situation)}
                        {data.vessel.orbitingName}
                    </fieldset>
                    <fieldset
                        className='tui-fieldset tui-border-dashed'
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        <legend>Crew Size</legend>
                        {data.vessel.crewCount}/{data.vessel.crewCapacity}
                    </fieldset>
                    <fieldset
                        className='tui-fieldset tui-border-dashed'
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        <legend>Ship Mass</legend>
                        <div>
                            Total: {massFormatter.format(data.vessel.mass)}
                        </div>
                        <div>
                            Dry: {massFormatter.format(data.vessel.dryMass)}
                        </div>
                    </fieldset>
                </div>
            </fieldset>
        </div>
    );
}

export default Overview;
