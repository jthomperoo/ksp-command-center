import useFlight from '../hooks/Flight';
import { MaxTwoDecimalFormatter, PercentFormatter } from '../util/Formatters';
import NoSignal from './NoSignal';

interface ResourceIndicatorProps {
    heading: string;
    value: number;
    max: number;
}

function ResourceIndicator({ heading, value, max }: ResourceIndicatorProps) {
    const percent = max > 0 ? value / max : 1;
    return (
        <div
            style={{
                width: '100%',
            }}
        >
            <div
                style={{
                    fontSize: '0.9em',
                }}
            >
                {heading}
            </div>
            <div
                style={{
                    fontSize: '0.8em',
                }}
            >
                {MaxTwoDecimalFormatter.format(value)}/
                {MaxTwoDecimalFormatter.format(max)}
            </div>
            <div
                className='tui-progress-bar'
                style={{
                    width: '100%',
                }}
            >
                <span className='tui-progress-label'>
                    {PercentFormatter.format(percent)}
                </span>
                <span
                    className='tui-progress'
                    style={{
                        width: `${percent * 100}%`,
                    }}
                ></span>
            </div>
        </div>
    );
}

function Resources() {
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
                    <legend>Resources</legend>
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
                <legend>Resources</legend>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        flexWrap: 'wrap',
                        gap: '10px',
                    }}
                >
                    <fieldset
                        className='tui-fieldset tui-border-dashed'
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        <legend>Liquid Fuel</legend>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                            }}
                        >
                            <ResourceIndicator
                                heading='Current Stage'
                                value={data.vessel.stageLiquidFuel}
                                max={data.vessel.stageMaxLiquidFuel}
                            />
                            <ResourceIndicator
                                heading='Total'
                                value={data.vessel.totalLiquidFuel}
                                max={data.vessel.totalMaxLiquidFuel}
                            />
                        </div>
                    </fieldset>
                    <fieldset
                        className='tui-fieldset tui-border-dashed'
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        <legend>Oxidizer</legend>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                            }}
                        >
                            <ResourceIndicator
                                heading='Current Stage'
                                value={data.vessel.stageOxidizer}
                                max={data.vessel.stageMaxOxidizer}
                            />
                            <ResourceIndicator
                                heading='Total'
                                value={data.vessel.totalOxidizer}
                                max={data.vessel.totalMaxOxidizer}
                            />
                        </div>
                    </fieldset>
                    <fieldset
                        className='tui-fieldset tui-border-dashed'
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        <legend>Solid Fuel</legend>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                            }}
                        >
                            <ResourceIndicator
                                heading='Current Stage'
                                value={data.vessel.stageSolidFuel}
                                max={data.vessel.stageMaxSolidFuel}
                            />
                            <ResourceIndicator
                                heading='Total'
                                value={data.vessel.totalSolidFuel}
                                max={data.vessel.totalMaxSolidFuel}
                            />
                        </div>
                    </fieldset>
                    <fieldset
                        className='tui-fieldset tui-border-dashed'
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        <legend>Electric Charge</legend>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                            }}
                        >
                            <ResourceIndicator
                                heading='Current Stage'
                                value={data.vessel.stageElectricCharge}
                                max={data.vessel.stageMaxElectricCharge}
                            />
                            <ResourceIndicator
                                heading='Total'
                                value={data.vessel.totalElectricCharge}
                                max={data.vessel.totalMaxElectricCharge}
                            />
                        </div>
                    </fieldset>
                    <fieldset
                        className='tui-fieldset tui-border-dashed'
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        <legend>Monopropellant</legend>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                            }}
                        >
                            <ResourceIndicator
                                heading='Current Stage'
                                value={data.vessel.stageMonoPropellant}
                                max={data.vessel.stageMaxMonoPropellant}
                            />
                            <ResourceIndicator
                                heading='Total'
                                value={data.vessel.totalMonoPropellant}
                                max={data.vessel.totalMaxMonoPropellant}
                            />
                        </div>
                    </fieldset>
                </div>
            </fieldset>
        </div>
    );
}

export default Resources;
