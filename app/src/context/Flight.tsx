import { createContext, ReactNode, useEffect, useState } from 'react';
import { AutoPilotMode, DataUpdate } from '../DataUpdate';
import { socket } from '../api/Socket';

const DATA_TO_STORE = 100;

interface FlightContextType {
    history: DataUpdate[];
    data: DataUpdate;

    nextStage: () => void;
    setSas: (value: boolean) => void;
    setRcs: (value: boolean) => void;
    setLights: (value: boolean) => void;
    setGear: (value: boolean) => void;
    setBrakes: (value: boolean) => void;
    setThrottle: (value: number) => void;
    setAutoPilotMode: (value: AutoPilotMode) => void;
    setDirectionControl: (pitch: number, yaw: number, roll: number) => void;
    setAntennas: (value: boolean) => void;
    setCargoBays: (value: boolean) => void;
    setRadiators: (value: boolean) => void;
    setSolarPanels: (value: boolean) => void;
    setActionGroup: (i: number, value: boolean) => void;
    setTargetBody: (value: string | undefined) => void;
    setTargetVessel: (value: number | undefined) => void;
}

const FlightContext = createContext<FlightContextType | undefined>(undefined);

function FlightProvider({ children }: { children: ReactNode }) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [data, setData] = useState<DataUpdate>();
    const [history, setHistory] = useState<DataUpdate[]>([]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onDataUpdate(value: DataUpdate) {
            console.log(value);
            setData(value);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('dataUpdate', onDataUpdate);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('dataUpdate', onDataUpdate);
        };
    }, []);

    useEffect(() => {
        if (data === undefined) {
            return;
        }

        const historyEntry = data;

        setHistory((existing) => {
            existing.push(historyEntry);
            return existing.slice(-DATA_TO_STORE);
        });
    }, [data]);

    const nextStage = () => {
        socket.emit('next_stage');
    };

    const setSas = (value: boolean) => {
        socket.emit('set_sas', value);
    };

    const setRcs = (value: boolean) => {
        socket.emit('set_rcs', value);
    };

    const setLights = (value: boolean) => {
        socket.emit('set_lights', value);
    };

    const setGear = (value: boolean) => {
        socket.emit('set_gear', value);
    };

    const setBrakes = (value: boolean) => {
        socket.emit('set_brakes', value);
    };

    const setAntennas = (value: boolean) => {
        socket.emit('set_antennas', value);
    };

    const setCargoBays = (value: boolean) => {
        socket.emit('set_cargo_bays', value);
    };

    const setRadiators = (value: boolean) => {
        socket.emit('set_radiators', value);
    };

    const setSolarPanels = (value: boolean) => {
        socket.emit('set_solar_panels', value);
    };

    const setThrottle = (value: number) => {
        socket.emit('set_throttle', value);
    };

    const setAutoPilotMode = (autoPilotMode: AutoPilotMode) => {
        socket.emit('set_auto_pilot_mode', autoPilotMode);
    };

    const setDirectionControl = (pitch: number, yaw: number, roll: number) => {
        socket.emit('set_direction_control', pitch, yaw, roll);
    };

    const setActionGroup = (group: number, value: boolean) => {
        socket.emit('set_action_group', group, value);
    };

    const setTargetBody = (value: string | undefined) => {
        socket.emit('set_target_body', value);
    };

    const setTargetVessel = (value: number | undefined) => {
        socket.emit('set_target_vessel', value);
    };

    const ready = isConnected && data !== undefined;

    if (!ready) {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div className='tui-progress-bar'>
                    <span className='tui-indeterminate'></span>
                    <span className='tui-progress-label'>Connecting...</span>
                </div>
            </div>
        );
    }

    return (
        <FlightContext.Provider
            value={{
                data: data,
                history: history,
                nextStage: nextStage,
                setSas: setSas,
                setRcs: setRcs,
                setLights: setLights,
                setGear: setGear,
                setBrakes: setBrakes,
                setThrottle: setThrottle,
                setAutoPilotMode: setAutoPilotMode,
                setDirectionControl: setDirectionControl,
                setAntennas: setAntennas,
                setCargoBays: setCargoBays,
                setRadiators: setRadiators,
                setSolarPanels: setSolarPanels,
                setActionGroup: setActionGroup,
                setTargetBody: setTargetBody,
                setTargetVessel: setTargetVessel,
            }}
        >
            {children}
        </FlightContext.Provider>
    );
}

export { FlightContext };

export default FlightProvider;
