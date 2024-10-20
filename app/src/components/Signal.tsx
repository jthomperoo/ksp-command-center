import SignalSvg from '../assets/signal.svg?react';
import useFlight from '../hooks/Flight';
import { PercentFormatter } from '../util/Formatters';
import NoSignal from './NoSignal';

function Signal() {
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
                    <legend>Signal</legend>
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
                <legend>Signal</legend>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <SignalSvg width='250px' fill='white' />
                    Signal Strength:{' '}
                    {PercentFormatter.format(data.vessel.signalStrength)}
                </div>
            </fieldset>
        </div>
    );
}

export default Signal;
