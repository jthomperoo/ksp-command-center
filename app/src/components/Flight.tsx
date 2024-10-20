import useFlight from '../hooks/Flight';
import {
    DistanceFormatter,
    MaxTwoDecimalFormatter,
    RadiansFormatter,
    VelocityFormatter,
} from '../util/Formatters';
import { FormatKSPDuration } from '../util/Time';
import NoSignal from './NoSignal';

function Flight() {
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
                    <legend>Flight</legend>
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
                height: '100%',
            }}
        >
            <fieldset className='tui-fieldset'>
                <legend>Flight</legend>
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        Altitude Above Sea:{' '}
                        <span>
                            {DistanceFormatter.format(data.vessel.seaAltitude)}
                        </span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        Altitude Above Land:{' '}
                        <span>
                            {DistanceFormatter.format(
                                data.vessel.surfaceAltitude,
                            )}
                        </span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        Apoapsis:{' '}
                        <span>
                            {DistanceFormatter.format(data.vessel.apoapsis)}
                        </span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        Periapsis:{' '}
                        <span>
                            {DistanceFormatter.format(data.vessel.periapsis)}
                        </span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        Time to Apoapsis:{' '}
                        <span>
                            {FormatKSPDuration(data.vessel.timeToApoapsis)}
                        </span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        Time to Periapsis:{' '}
                        <span>
                            {FormatKSPDuration(data.vessel.timeToPeriapsis)}
                        </span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        Inclination:{' '}
                        <span>
                            {RadiansFormatter.format(data.vessel.inclination)}
                        </span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        Eccentricity:{' '}
                        <span>
                            {MaxTwoDecimalFormatter.format(
                                data.vessel.eccentricity,
                            )}
                        </span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        Velocity:{' '}
                        <span>
                            {VelocityFormatter.format(data.vessel.velocity)}m/s
                        </span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        Vertical Velocity:{' '}
                        <span>
                            {VelocityFormatter.format(
                                data.vessel.verticalVelocity,
                            )}
                            m/s
                        </span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        Horizontal Velocity:{' '}
                        <span>
                            {VelocityFormatter.format(
                                data.vessel.horizontalVelocity,
                            )}
                            m/s
                        </span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        Orbital Velocity:{' '}
                        <span>
                            {VelocityFormatter.format(
                                data.vessel.orbitalVelocity,
                            )}
                            m/s
                        </span>
                    </div>
                </div>
            </fieldset>
        </div>
    );
}

export default Flight;
