import useFlight from '../hooks/Flight';
import { DistanceFormatter, VelocityFormatter } from '../util/Formatters';
import NoSignal from './NoSignal';

function Target() {
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
                    <legend>Target</legend>
                    <NoSignal />
                </fieldset>
            </div>
        );
    }

    if (data.vessel.targetData === null) {
        return (
            <div
                className='tui-window'
                style={{
                    flexGrow: 1,
                }}
            >
                <fieldset className='tui-fieldset'>
                    <legend>Target</legend>- No Target -
                </fieldset>
            </div>
        );
    }

    return (
        <div
            className='tui-window'
            style={{
                flexGrow: 1,
                minWidth: '250px',
            }}
        >
            <fieldset className='tui-fieldset'>
                <legend>Target</legend>
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
                        <legend>Target</legend>
                        {data.vessel.targetData.name}
                    </fieldset>
                    <fieldset
                        className='tui-fieldset tui-border-dashed'
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        <legend>Distance</legend>
                        {DistanceFormatter.format(
                            data.vessel.targetData.distance,
                        )}
                    </fieldset>
                    <fieldset
                        className='tui-fieldset tui-border-dashed'
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        <legend>Velocity</legend>
                        {VelocityFormatter.format(
                            data.vessel.targetData.velocity,
                        )}
                        m/s
                    </fieldset>
                    <fieldset
                        className='tui-fieldset tui-border-dashed'
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        <legend>Horizontal Velocity</legend>
                        {VelocityFormatter.format(
                            data.vessel.targetData.horizontalVelocity,
                        )}
                        m/s
                    </fieldset>
                    <fieldset
                        className='tui-fieldset tui-border-dashed'
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        <legend>Vertical Velocity</legend>
                        {VelocityFormatter.format(
                            data.vessel.targetData.verticalVelocity,
                        )}
                        m/s
                    </fieldset>
                </div>
            </fieldset>
        </div>
    );
}

export default Target;
