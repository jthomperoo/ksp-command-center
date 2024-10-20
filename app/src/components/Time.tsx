import useFlight from '../hooks/Flight';
import { FormatKSPTime } from '../util/Time';

function Time() {
    const { data } = useFlight();

    return (
        <div
            className='tui-panel cyan-168 full-width black-255-text tui-no-shadow'
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                paddingLeft: '10px',
                paddingRight: '10px',
            }}
        >
            <div>{FormatKSPTime(data.missionTime)}</div>
            <div>{FormatKSPTime(data.universeTime)}</div>
        </div>
    );
}

export default Time;
