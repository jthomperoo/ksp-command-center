import { ChangeEvent } from 'react';
import useFlight from '../hooks/Flight';
import { PercentFormatter } from '../util/Formatters';
import NoSignal from './NoSignal';

function Control() {
    const {
        data,
        setSas,
        setRcs,
        setLights,
        setGear,
        setBrakes,
        setThrottle,
        setAutoPilotMode,
    } = useFlight();

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
                    <legend>Control</legend>
                    <NoSignal />
                </fieldset>
            </div>
        );
    }

    const toggleSas = () => {
        if (data.vessel === undefined) {
            return;
        }

        setSas(!data.vessel.sas);
    };

    const toggleRcs = () => {
        if (data.vessel === undefined) {
            return;
        }

        setRcs(!data.vessel.rcs);
    };

    const toggleLights = () => {
        if (data.vessel === undefined) {
            return;
        }

        setLights(!data.vessel.lights);
    };

    const toggleGear = () => {
        if (data.vessel === undefined) {
            return;
        }

        setGear(!data.vessel.gear);
    };

    const toggleBrakes = () => {
        if (data.vessel === undefined) {
            return;
        }

        setBrakes(!data.vessel.brakes);
    };

    const onThrottleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (data.vessel === undefined) {
            return;
        }

        setThrottle(parseFloat(event.target.value) / 100);
    };

    return (
        <div
            className='tui-window'
            style={{
                flexGrow: 1,
            }}
        >
            <fieldset className='tui-fieldset'>
                <legend>Control</legend>
                <div>
                    <fieldset className='tui-input-fieldset tui-border-dashed'>
                        <legend>Throttle</legend>
                        <input
                            className='slider'
                            type='range'
                            min='0'
                            max='100'
                            value={data.vessel.throttle * 100}
                            onChange={onThrottleChange}
                        />
                        <span>
                            {PercentFormatter.format(data.vessel.throttle)}
                        </span>
                    </fieldset>
                    <fieldset className='tui-input-fieldset tui-border-dashed'>
                        <legend>Assist</legend>
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '10px',
                            }}
                        >
                            <label className='tui-checkbox'>
                                SAS
                                <input
                                    type='checkbox'
                                    checked={data.vessel.sas}
                                    onChange={toggleSas}
                                />
                                <span></span>
                            </label>
                            <label className='tui-checkbox'>
                                RCS
                                <input
                                    type='checkbox'
                                    checked={data.vessel.rcs}
                                    onChange={toggleRcs}
                                />
                                <span></span>
                            </label>
                        </div>
                    </fieldset>
                    <fieldset className='tui-input-fieldset tui-border-dashed'>
                        <legend>Craft</legend>
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '10px',
                            }}
                        >
                            <label className='tui-checkbox'>
                                Lights
                                <input
                                    type='checkbox'
                                    checked={data.vessel.lights}
                                    onChange={toggleLights}
                                />
                                <span />
                            </label>
                            <label className='tui-checkbox'>
                                Gear
                                <input
                                    type='checkbox'
                                    checked={data.vessel.gear}
                                    onChange={toggleGear}
                                />
                                <span></span>
                            </label>
                            <label className='tui-checkbox'>
                                Brakes
                                <input
                                    type='checkbox'
                                    checked={data.vessel.brakes}
                                    onChange={toggleBrakes}
                                />
                                <span></span>
                            </label>
                        </div>
                    </fieldset>

                    <fieldset className='tui-input-fieldset tui-border-dashed'>
                        <legend>Auto Pilot</legend>
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '16px',
                            }}
                        >
                            <label className='tui-radio'>
                                Stability
                                <input
                                    type='radio'
                                    checked={
                                        data.vessel.autoPilotMode ===
                                        'stability_assist'
                                    }
                                    onChange={() =>
                                        setAutoPilotMode('stability_assist')
                                    }
                                />
                                <span></span>
                            </label>
                            <label className='tui-radio'>
                                Maneuver
                                <input
                                    type='radio'
                                    checked={
                                        data.vessel.autoPilotMode === 'maneuver'
                                    }
                                    onChange={() =>
                                        setAutoPilotMode('maneuver')
                                    }
                                />
                                <span></span>
                            </label>
                            <label className='tui-radio'>
                                Prograde
                                <input
                                    type='radio'
                                    checked={
                                        data.vessel.autoPilotMode === 'prograde'
                                    }
                                    onChange={() =>
                                        setAutoPilotMode('prograde')
                                    }
                                />
                                <span></span>
                            </label>
                            <label className='tui-radio'>
                                Retrograde
                                <input
                                    type='radio'
                                    checked={
                                        data.vessel.autoPilotMode ===
                                        'retrograde'
                                    }
                                    onChange={() =>
                                        setAutoPilotMode('retrograde')
                                    }
                                />
                                <span></span>
                            </label>
                            <label className='tui-radio'>
                                Normal
                                <input
                                    type='radio'
                                    checked={
                                        data.vessel.autoPilotMode === 'normal'
                                    }
                                    onChange={() => setAutoPilotMode('normal')}
                                />
                                <span></span>
                            </label>
                            <label className='tui-radio'>
                                Anti-Normal
                                <input
                                    type='radio'
                                    checked={
                                        data.vessel.autoPilotMode ===
                                        'anti_normal'
                                    }
                                    onChange={() =>
                                        setAutoPilotMode('anti_normal')
                                    }
                                />
                                <span></span>
                            </label>
                            <label className='tui-radio'>
                                Radial
                                <input
                                    type='radio'
                                    checked={
                                        data.vessel.autoPilotMode === 'radial'
                                    }
                                    onChange={() => setAutoPilotMode('radial')}
                                />
                                <span></span>
                            </label>
                            <label className='tui-radio'>
                                Anti-Radial
                                <input
                                    type='radio'
                                    checked={
                                        data.vessel.autoPilotMode ===
                                        'anti_radial'
                                    }
                                    onChange={() =>
                                        setAutoPilotMode('anti_radial')
                                    }
                                />
                                <span></span>
                            </label>
                            <label className='tui-radio'>
                                Target
                                <input
                                    type='radio'
                                    checked={
                                        data.vessel.autoPilotMode === 'target'
                                    }
                                    onChange={() => setAutoPilotMode('target')}
                                />
                                <span></span>
                            </label>
                            <label className='tui-radio'>
                                Anti-Target
                                <input
                                    type='radio'
                                    checked={
                                        data.vessel.autoPilotMode ===
                                        'anti_target'
                                    }
                                    onChange={() =>
                                        setAutoPilotMode('anti_target')
                                    }
                                />
                                <span></span>
                            </label>
                        </div>
                    </fieldset>
                </div>
            </fieldset>
        </div>
    );
}

export default Control;
