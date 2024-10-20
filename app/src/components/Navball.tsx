import { Edges, OrbitControls, Outlines } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { Mesh, Vector3 } from 'three';
import { OrbitControls as OrbitControlsExported } from 'three-stdlib';
import { VesselData } from '../DataUpdate';
import useFlight from '../hooks/Flight';
import NoSignal from './NoSignal';

const NAVBALL_RADIUS = 2.2;

interface NavballObjectProps {
    vessel: VesselData;
}

function NavballObjects({ vessel }: NavballObjectProps) {
    const orbitRef = useRef<OrbitControlsExported>(null);
    const levelIndicatorRef = useRef<Mesh>(null);
    const progradeIndicatorRef = useRef<Mesh>(null);
    const retrogradeIndicatorRef = useRef<Mesh>(null);

    useEffect(() => {
        if (
            orbitRef.current === null ||
            levelIndicatorRef.current === null ||
            progradeIndicatorRef.current === null ||
            retrogradeIndicatorRef.current === null
        ) {
            return;
        }

        const navballPitch = ((-vessel.pitch + 90) / 180) * Math.PI;
        const navballYaw = (vessel.heading / 360) * (Math.PI * 2);
        const navballRoll = (vessel.roll / 360) * (Math.PI * 2);

        const progradePitch = ((-vessel.progradePitch + 90) / 180) * Math.PI;
        const progradeYaw = (vessel.progradeYaw / 360) * (Math.PI * 2);

        const retrogradePitch = Math.PI - progradePitch;
        const retrogradeYaw = progradeYaw - Math.PI;

        orbitRef.current.setPolarAngle(navballPitch);
        orbitRef.current.setAzimuthalAngle(navballYaw);

        levelIndicatorRef.current.position.setFromSphericalCoords(
            NAVBALL_RADIUS,
            navballPitch,
            navballYaw,
        );
        levelIndicatorRef.current.setRotationFromAxisAngle(
            new Vector3(0, 0, 1),
            navballRoll,
        );

        progradeIndicatorRef.current.position.setFromSphericalCoords(
            NAVBALL_RADIUS,
            progradePitch,
            progradeYaw,
        );
        retrogradeIndicatorRef.current.position.setFromSphericalCoords(
            NAVBALL_RADIUS,
            retrogradePitch,
            retrogradeYaw,
        );
    }, [
        orbitRef,
        levelIndicatorRef,
        progradeIndicatorRef,
        retrogradeIndicatorRef,
        vessel,
    ]);

    return (
        <Fragment>
            <ambientLight intensity={3} />

            {/* Top half of navball */}
            <mesh rotation={[0, 0, 0]}>
                <sphereGeometry
                    args={[
                        NAVBALL_RADIUS,
                        16,
                        8,
                        0,
                        2 * Math.PI,
                        0,
                        0.5 * Math.PI,
                    ]}
                ></sphereGeometry>
                <meshStandardMaterial color='#0000A8' />
                <Edges linewidth={2.5} threshold={5} color='white' />
                <Outlines thickness={5} color='white' />
            </mesh>

            {/* Bottom half of navball */}
            <mesh rotation={[Math.PI, 0, 0]}>
                <sphereGeometry
                    args={[
                        NAVBALL_RADIUS,
                        16,
                        8,
                        0,
                        2 * Math.PI,
                        0,
                        0.5 * Math.PI,
                    ]}
                ></sphereGeometry>
                <meshStandardMaterial color='#766142' />
                <Edges linewidth={2.5} threshold={5} color='white' />
                <Outlines thickness={5} color='white' />
            </mesh>

            {/* North Line */}
            <mesh rotation={[0, Math.PI / 2, Math.PI / 2]}>
                <torusGeometry
                    args={[
                        NAVBALL_RADIUS + 0.1,
                        0.05,
                        undefined,
                        undefined,
                        Math.PI,
                    ]}
                />
                <meshStandardMaterial color='red' />
            </mesh>

            {/* Level Indicator */}
            <mesh ref={levelIndicatorRef}>
                <coneGeometry args={[0.3, 0.3, 3]} />
                <meshStandardMaterial color='gold' />
            </mesh>

            {/* Prograde Indicator */}
            <mesh ref={progradeIndicatorRef}>
                <sphereGeometry args={[0.2]} />
                <meshStandardMaterial color='green' />
            </mesh>

            {/* Retrograde Indicator */}
            <mesh ref={retrogradeIndicatorRef}>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshStandardMaterial color='green' />
            </mesh>

            <OrbitControls
                ref={orbitRef}
                target={[0, 0, 0]}
                makeDefault
                dampingFactor={0.3}
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
            />
        </Fragment>
    );
}

function Navball() {
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
                    <legend>Navball</legend>
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
                <legend>Navball</legend>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Canvas
                        style={{
                            width: '400px',
                            height: '400px',
                        }}
                        camera={{ position: [-10, 0, 0], fov: 35 }}
                    >
                        <NavballObjects vessel={data.vessel} />
                    </Canvas>
                </div>
            </fieldset>
        </div>
    );
}

export default Navball;
