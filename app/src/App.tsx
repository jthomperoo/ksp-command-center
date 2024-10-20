import { useState } from 'react';
import Time from './components/Time';
import FlightProvider from './context/Flight';
import Capcom from './pages/Capcom';
import Eecom from './pages/Eecom';
import Fido from './pages/Fido';
import Mission from './pages/Mission';

type page = 'mission' | 'fido' | 'eecom' | 'capcom';

interface RouterProps {
    page: page;
}

function Router({ page }: RouterProps) {
    switch (page) {
        case 'mission':
            return <Mission />;
        case 'fido':
            return <Fido />;
        case 'eecom':
            return <Eecom />;
        case 'capcom':
            return <Capcom />;
    }
}

interface TabProps {
    active: boolean;
    page: page;
    title: string;
    setPage: (page: page) => void;
}

function Tab({ active, page, title, setPage }: TabProps) {
    return (
        <li>
            <a
                className={`tui-tab ${active ? 'active' : ''}`}
                onClick={() => setPage(page)}
            >
                {title}
            </a>
        </li>
    );
}

function App() {
    const [page, setPage] = useState<page>('mission');

    return (
        <div className='page bordered white-168'>
            <div className='tui-panel green-168 full-width black-255-text tui-no-shadow center'>
                KSP Command Center
            </div>
            <div className='tui-tabs'>
                <ul>
                    <Tab
                        title='Mission'
                        active={page === 'mission'}
                        page='mission'
                        setPage={setPage}
                    />
                    <Tab
                        title='FIDO'
                        active={page === 'fido'}
                        page='fido'
                        setPage={setPage}
                    />
                    <Tab
                        title='EECOM'
                        active={page === 'eecom'}
                        page='eecom'
                        setPage={setPage}
                    />
                    <Tab
                        title='CAPCOM'
                        active={page === 'capcom'}
                        page='capcom'
                        setPage={setPage}
                    />
                </ul>
            </div>
            <div
                className='tui-bg-cyan-black'
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <FlightProvider>
                    <Time />
                    <div className='content'>
                        <Router page={page} />
                    </div>
                </FlightProvider>
            </div>
        </div>
    );
}

export default App;
