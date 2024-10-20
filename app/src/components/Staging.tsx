import useFlight from '../hooks/Flight';
import NoSignal from './NoSignal';

function Staging() {
    const { data, nextStage } = useFlight();

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
                    <legend>Staging</legend>
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
                <legend>Staging</legend>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                >
                    <div>Current: {data.vessel.currentStage}</div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexGrow: 1,
                        }}
                    >
                        <button
                            className='tui-button red-168'
                            onClick={nextStage}
                            style={{
                                width: '250px',
                                height: '250px',
                            }}
                        >
                            Next Stage
                        </button>
                    </div>
                </div>
            </fieldset>
        </div>
    );
}

export default Staging;
