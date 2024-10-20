import useFlight from '../hooks/Flight';
import NoSignal from './NoSignal';

function Actions() {
    const { data, setActionGroup } = useFlight();

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
                    <legend>Actions</legend>
                    <NoSignal />
                </fieldset>
            </div>
        );
    }

    const toggleActionGroup = (group: number) => {
        if (data.vessel === undefined) {
            return;
        }

        setActionGroup(group, !data.vessel.actions[group]);
    };

    return (
        <div
            className='tui-window'
            style={{
                flexGrow: 1,
            }}
        >
            <fieldset className='tui-fieldset'>
                <legend>Actions</legend>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '8px',
                    }}
                >
                    {data.vessel.actions.map((actionStatus, i) => (
                        <label key={i} className='tui-checkbox'>
                            Action {i}
                            <input
                                type='checkbox'
                                checked={actionStatus}
                                onChange={() => toggleActionGroup(i)}
                            />
                            <span />
                        </label>
                    ))}
                </div>
            </fieldset>
        </div>
    );
}

export default Actions;
