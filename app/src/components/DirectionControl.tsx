import { Joystick, JoystickShape } from 'react-joystick-component';
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';
import useFlight from '../hooks/Flight';
import NoSignal from './NoSignal';

function DirectionControl() {
    const { data, setDirectionControl } = useFlight();

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
                    <legend>Direction Control</legend>
                    <NoSignal />
                </fieldset>
            </div>
        );
    }

    const pitch = data.vessel.pitchControl;
    const yaw = data.vessel.yawControl;
    const roll = data.vessel.rollControl;

    const clearPitchYaw = () => {
        setDirectionControl(0, 0, roll);
    };

    const clearRoll = () => {
        setDirectionControl(pitch, yaw, 0);
    };

    const pitchYawChange = (event: IJoystickUpdateEvent) => {
        setDirectionControl(event.y!, event.x!, roll);
    };

    const rollChange = (event: IJoystickUpdateEvent) => {
        setDirectionControl(pitch, yaw, event.x!);
    };

    return (
        <div
            className='tui-window'
            style={{
                flexGrow: 1,
            }}
        >
            <fieldset className='tui-fieldset'>
                <legend>Direction Control</legend>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '320px',
                            height: '280px',
                            position: 'relative',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                textAlign: 'center',
                            }}
                        >
                            ←Yaw→
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                left: -30,
                                transform: 'rotate(-90deg)',
                            }}
                        >
                            ←Pitch→
                        </div>
                        <Joystick
                            size={200}
                            sticky={false}
                            baseColor='white'
                            stickColor='#00a8a8'
                            baseShape={JoystickShape.Circle}
                            throttle={100}
                            pos={{
                                x: yaw,
                                y: pitch,
                            }}
                            move={pitchYawChange}
                            stop={clearPitchYaw}
                        ></Joystick>
                    </div>
                    <div>
                        <Joystick
                            size={100}
                            sticky={false}
                            baseColor='white'
                            stickColor='#00a8a8'
                            baseShape={JoystickShape.AxisX}
                            throttle={100}
                            pos={{
                                x: roll,
                                y: 0,
                            }}
                            move={rollChange}
                            stop={clearRoll}
                        ></Joystick>
                        <div
                            style={{
                                width: '100%',
                                paddingTop: '8px',
                                textAlign: 'center',
                            }}
                        >
                            ←Roll→
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    );
}

export default DirectionControl;
