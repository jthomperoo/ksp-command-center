import KerbalSvg from '../assets/kerbal.svg?react';
import useFlight from '../hooks/Flight';
import NoSignal from './NoSignal';

function Crew() {
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
                    <legend>Crew</legend>
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
                <legend>Crew</legend>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '16px',
                        flexWrap: 'wrap',
                        minWidth: '250px',
                        justifyContent: 'center',
                        height: '100%',
                        alignItems: 'center',
                    }}
                >
                    {data.vessel.crew.map((crewMember) => (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <KerbalSvg
                                style={{
                                    fill: 'white',
                                    width: '100px',
                                    height: '100px',
                                }}
                            />
                            <div
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                {crewMember.name}
                            </div>
                            <div
                                style={{
                                    textAlign: 'center',
                                    fontSize: '0.5em',
                                }}
                            >
                                {crewMember.trait}
                            </div>
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    );
}

export default Crew;
