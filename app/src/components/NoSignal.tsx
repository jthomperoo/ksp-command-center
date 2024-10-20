function NoSignal() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                className='tui-progress-bar'
                style={{
                    width: '300px',
                }}
            >
                <span className='tui-indeterminate'></span>
                <span className='tui-progress-label'>No Signal</span>
            </div>
        </div>
    );
}

export default NoSignal;
