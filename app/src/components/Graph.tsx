import { ResponsiveLine } from '@nivo/line';
import { useState } from 'react';
import { DataUpdate } from '../DataUpdate';
import useFlight from '../hooks/Flight';
import { FormatKSPDuration } from '../util/Time';
import NoSignal from './NoSignal';

const graphValueTypes = [
    'surface_altitude',
    'sea_altitude',
    'velocity',
    'vertical_velocity',
    'horizontal_velocity',
    'orbital_velocity',
] as const;
type GraphValueType = (typeof graphValueTypes)[number];

function graphValueName(type: GraphValueType) {
    switch (type) {
        case 'surface_altitude':
            return 'Surface Altitude';
        case 'sea_altitude':
            return 'Sea Altitude';
        case 'velocity':
            return 'Velocity';
        case 'vertical_velocity':
            return 'Vertical Velocity';
        case 'horizontal_velocity':
            return 'Horizontal Velocity';
        case 'orbital_velocity':
            return 'Orbital Velocity';
    }
}

function graphValue(type: GraphValueType, data: DataUpdate) {
    switch (type) {
        case 'surface_altitude':
            return data.vessel?.surfaceAltitude;
        case 'sea_altitude':
            return data.vessel?.seaAltitude;
        case 'velocity':
            return data.vessel?.velocity;
        case 'vertical_velocity':
            return data.vessel?.verticalVelocity;
        case 'horizontal_velocity':
            return data.vessel?.horizontalVelocity;
        case 'orbital_velocity':
            return data.vessel?.orbitalVelocity;
    }
}

function Graph() {
    const { data, history } = useFlight();
    const [graphType, setGraphType] =
        useState<GraphValueType>('surface_altitude');

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
                    <legend>Graph</legend>
                    <NoSignal />
                </fieldset>
            </div>
        );
    }

    return (
        <div
            className='tui-window'
            style={{
                width: '100%',
            }}
        >
            <fieldset className='tui-fieldset'>
                <legend>Graph</legend>
                <div
                    style={{
                        width: '100%',
                    }}
                >
                    <li className='tui-dropdown'>
                        <button
                            className='tui-button'
                            style={{
                                width: '320px',
                            }}
                        >
                            {graphValueName(graphType)}
                        </button>
                        <div className='tui-dropdown-content'>
                            <ul>
                                {graphValueTypes.map((graphValueType) => (
                                    <li key={graphValueType}>
                                        <a
                                            onClick={() => {
                                                setGraphType(graphValueType);
                                            }}
                                        >
                                            {graphValueName(graphValueType)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                </div>
                <div
                    style={{
                        width: '100%',
                        height: '250px',
                    }}
                >
                    <ResponsiveLine
                        data={[
                            {
                                id: 'value',
                                data: history.map((historyEntry) => ({
                                    x: historyEntry.missionTime,
                                    y: graphValue(graphType, historyEntry),
                                })),
                            },
                        ]}
                        lineWidth={5}
                        pointSize={0}
                        colors={['rgb(0, 168, 168)']}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: graphValueName(graphType),
                            legendOffset: -40,
                            legendPosition: 'middle',
                            truncateTickAt: 0,
                        }}
                        axisBottom={{
                            format: (value) => FormatKSPDuration(value),
                            tickRotation: 45,
                        }}
                        margin={{ top: 25, right: 0, bottom: 50, left: 50 }}
                        theme={{
                            text: {
                                fill: 'white',
                                fontFamily: 'VT323',
                            },
                        }}
                    />
                </div>
            </fieldset>
        </div>
    );
}

export default Graph;
