import useFlight from '../hooks/Flight';
import NoSignal from './NoSignal';

function BodyTargeting() {
    const { data, setTargetBody } = useFlight();

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
                    <legend>Body Targeting</legend>
                    <NoSignal />
                </fieldset>
            </div>
        );
    }

    const changeTargetBody = (target: string | undefined) => {
        setTargetBody(target);
    };

    const targetBody = data.vessel.targetBody;

    return (
        <div
            className='tui-window'
            style={{
                flexGrow: 1,
            }}
        >
            <fieldset className='tui-fieldset'>
                <legend>Body Targeting</legend>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '16px',
                    }}
                >
                    <label className='tui-radio'>
                        No Target
                        <input
                            type='radio'
                            checked={targetBody === null}
                            onChange={() => changeTargetBody(undefined)}
                        />
                        <span></span>
                    </label>
                    {data.bodies.map((body) => (
                        <label key={body.name} className='tui-radio'>
                            {body.name}
                            <input
                                type='radio'
                                checked={targetBody === body.name}
                                onChange={() => changeTargetBody(body.name)}
                            />
                            <span></span>
                        </label>
                    ))}
                </div>
            </fieldset>
        </div>
    );
}

export default BodyTargeting;
