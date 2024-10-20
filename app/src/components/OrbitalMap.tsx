import { Edges, Line, OrbitControls, Outlines, Text } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Fragment, useEffect, useRef } from 'react';
import { Mesh, Quaternion, Vector3 } from 'three';
import { OrbitControls as OrbitControlsExported } from 'three-stdlib';
import { CelestialBody, OtherVessel, VesselData } from '../DataUpdate';
import useFlight from '../hooks/Flight';
import { GenerateOrbitalPath } from '../util/Orbit';
import NoSignal from './NoSignal';

const SCALE = 100000;
const RENDER_DISTANCE = 2000000;
const MAX_DISTANCE = 500000;
const CELESTIAL_BODY_LABEL_HEIGHT = 0.6;
const TEXT_RELATIVE_SCALE = 100000;

const CELESTIAL_BODY_MAP = new Map([
    ['Sun', '#e8af10'],
    ['Kerbin', '#22a9e3'],
    ['Mun', '#4f4e4a'],
    ['Duna', '#eb4034'],
]);

interface VesselRenderProps {
    vessel: VesselData;
}

function VesselRender({ vessel }: VesselRenderProps) {
    const { camera } = useThree();
    const vesselRef = useRef<Mesh>(null);
    const labelRef = useRef<any>(null);

    useEffect(() => {
        if (vesselRef.current === null) {
            return;
        }

        const rotation = new Quaternion(
            vessel.rotation.x,
            vessel.rotation.y,
            vessel.rotation.z,
            vessel.rotation.w,
        );
        vesselRef.current.rotation.setFromQuaternion(rotation);

        vesselRef.current.position.set(
            vessel.position.x / SCALE,
            vessel.position.y / SCALE,
            vessel.position.z / SCALE,
        );

        labelRef.current.position.x = vessel.position.x / SCALE;
        labelRef.current.position.y = vessel.position.y / SCALE + 1;
        labelRef.current.position.z = vessel.position.z / SCALE;

        labelRef.current.lookAt(camera.position);
    }, [vesselRef, vessel, camera.position]);

    const orbitalPath = GenerateOrbitalPath(
        vessel.orbit.semiMajorAxis,
        vessel.orbit.eccentricity,
        vessel.orbit.inclination,
        vessel.orbit.center,
        360,
    );

    return (
        <Fragment>
            <mesh ref={vesselRef}>
                <coneGeometry args={[0.25, 0.5, 4]} />
                <meshStandardMaterial color='white' />
                <Edges linewidth={2.5} threshold={0} color='red' />
                <Outlines thickness={5} color='red' />
            </mesh>
            <Text
                ref={labelRef}
                color='red'
                anchorX='center'
                anchorY='middle'
                scale={[0.5, 0.5, 0.5]}
            >
                {vessel.name}
            </Text>
            <Line
                points={orbitalPath.map((point) => [
                    point.x / SCALE,
                    point.y / SCALE,
                    point.z / SCALE,
                ])}
                lineWidth={2}
                color='red'
            />
        </Fragment>
    );
}

interface OtherVesselRenderProps {
    otherVessel: OtherVessel;
    targeted: boolean;
}

function OtherVesselRender({ otherVessel, targeted }: OtherVesselRenderProps) {
    const { camera } = useThree();
    const otherVesselRef = useRef<Mesh>(null);
    const labelRef = useRef<any>(null);

    useEffect(() => {
        if (otherVesselRef.current === null) {
            return;
        }

        otherVesselRef.current.position.set(
            otherVessel.position.x / SCALE,
            otherVessel.position.y / SCALE,
            otherVessel.position.z / SCALE,
        );

        labelRef.current.position.x = otherVessel.position.x / SCALE;
        labelRef.current.position.y = otherVessel.position.y / SCALE + 1;
        labelRef.current.position.z = otherVessel.position.z / SCALE;

        labelRef.current.lookAt(camera.position);
    }, [otherVesselRef, otherVessel, camera.position]);

    const orbitalPath = GenerateOrbitalPath(
        otherVessel.orbit.semiMajorAxis,
        otherVessel.orbit.eccentricity,
        otherVessel.orbit.inclination,
        otherVessel.orbit.center,
        360,
    );

    return (
        <Fragment>
            <mesh ref={otherVesselRef}>
                <coneGeometry args={[0.25, 0.5, 4]} />
                <meshStandardMaterial color='white' />
                <Edges
                    linewidth={2.5}
                    threshold={0}
                    color={targeted ? 'purple' : 'green'}
                />
                <Outlines thickness={5} color={targeted ? 'purple' : 'green'} />
            </mesh>
            <Text
                ref={labelRef}
                color={targeted ? 'purple' : 'green'}
                anchorX='center'
                anchorY='middle'
                scale={[0.5, 0.5, 0.5]}
            >
                {otherVessel.name}
            </Text>
            <Line
                points={orbitalPath.map((point) => [
                    point.x / SCALE,
                    point.y / SCALE,
                    point.z / SCALE,
                ])}
                lineWidth={2}
                color={targeted ? 'purple' : 'green'}
            />
        </Fragment>
    );
}

interface CelestialBodyRenderProps {
    celestialBody: CelestialBody;
    targeted: boolean;
}

function CelestialBodyRender({
    celestialBody,
    targeted,
}: CelestialBodyRenderProps) {
    const { camera } = useThree();
    const celestialBodyRef = useRef<Mesh>(null);
    const labelRef = useRef<any>(null);

    useEffect(() => {
        if (celestialBodyRef.current === null || labelRef.current === null) {
            return;
        }

        celestialBodyRef.current.position.x = celestialBody.position.x / SCALE;
        celestialBodyRef.current.position.y = celestialBody.position.y / SCALE;
        celestialBodyRef.current.position.z = celestialBody.position.z / SCALE;

        celestialBodyRef.current.scale.x = celestialBody.radius / SCALE;
        celestialBodyRef.current.scale.y = celestialBody.radius / SCALE;
        celestialBodyRef.current.scale.z = celestialBody.radius / SCALE;

        labelRef.current.position.x = celestialBody.position.x / SCALE;
        labelRef.current.position.y =
            celestialBody.position.y / SCALE +
            celestialBody.radius / SCALE +
            (celestialBody.radius / TEXT_RELATIVE_SCALE) *
                CELESTIAL_BODY_LABEL_HEIGHT;
        labelRef.current.position.z = celestialBody.position.z / SCALE;

        const cameraDistance = new Vector3()
            .copy(camera.position)
            .distanceTo(celestialBodyRef.current.position);
        const textScale = cameraDistance / 30;

        labelRef.current.scale.x = textScale;
        labelRef.current.scale.y = textScale;
        labelRef.current.scale.z = textScale;

        labelRef.current.lookAt(camera.position);
    }, [celestialBodyRef, celestialBody, camera.position]);

    const color = CELESTIAL_BODY_MAP.get(celestialBody.name) ?? '#0000A8';

    const orbitalPath =
        celestialBody.orbit !== null
            ? GenerateOrbitalPath(
                  celestialBody.orbit.semiMajorAxis,
                  celestialBody.orbit.eccentricity,
                  celestialBody.orbit.inclination,
                  celestialBody.orbit.center,
                  360,
              )
            : undefined;

    return (
        <Fragment>
            <mesh ref={celestialBodyRef}>
                <sphereGeometry args={[1]} />
                <meshStandardMaterial color={color} />
                <Edges
                    linewidth={1}
                    threshold={5}
                    color={targeted ? 'purple' : 'white'}
                />
            </mesh>
            <Text
                ref={labelRef}
                color={targeted ? 'purple' : 'white'}
                anchorX='center'
                anchorY='middle'
            >
                {celestialBody.name}
            </Text>
            {orbitalPath && (
                <Line
                    points={orbitalPath.map((point) => [
                        point.x / SCALE,
                        point.y / SCALE,
                        point.z / SCALE,
                    ])}
                    lineWidth={2}
                    color={targeted ? 'purple' : 'white'}
                />
            )}
        </Fragment>
    );
}

interface OrbitalCameraProps {
    vessel: VesselData;
}

function OrbitalCamera({ vessel }: OrbitalCameraProps) {
    const { camera } = useThree();
    const orbitControlsRef = useRef<OrbitControlsExported>(null);

    useEffect(() => {
        if (orbitControlsRef.current === null) {
            return;
        }

        const newVesselPosition = new Vector3(
            vessel.position.x / SCALE,
            vessel.position.y / SCALE,
            vessel.position.z / SCALE,
        );

        const previousCameraDifference = new Vector3().copy(
            orbitControlsRef.current.target,
        );
        previousCameraDifference.sub(camera.position);

        const newCameraPosition = new Vector3().copy(newVesselPosition);
        newCameraPosition.sub(previousCameraDifference);

        camera.position.set(
            newCameraPosition.x,
            newCameraPosition.y,
            newCameraPosition.z,
        );
        orbitControlsRef.current.target.set(
            newVesselPosition.x,
            newVesselPosition.y,
            newVesselPosition.z,
        );
    }, [orbitControlsRef, vessel, camera]);

    return (
        <OrbitControls
            ref={orbitControlsRef}
            camera={camera}
            dampingFactor={0.3}
            enablePan={false}
            minDistance={3}
            maxDistance={MAX_DISTANCE}
            zoom0={3}
        />
    );
}

function OrbitalMap() {
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
                    <legend>Orbital Map</legend>
                    <NoSignal />
                </fieldset>
            </div>
        );
    }

    const vessel = data.vessel;

    return (
        <div
            className='tui-window'
            style={{
                width: '100%',
            }}
        >
            <fieldset className='tui-fieldset'>
                <legend>Orbital Map</legend>
                <Canvas
                    style={{
                        width: '100%',
                        height: '400px',
                    }}
                    camera={{ fov: 35, far: RENDER_DISTANCE }}
                >
                    <ambientLight intensity={3} />

                    <VesselRender vessel={vessel} />

                    {data.bodies.map((body) => (
                        <CelestialBodyRender
                            key={body.name}
                            celestialBody={body}
                            targeted={
                                vessel.targetBody !== null &&
                                vessel.targetBody === body.name
                            }
                        />
                    ))}
                    {data.vessels.map((otherVessel, i) => (
                        <OtherVesselRender
                            otherVessel={otherVessel}
                            targeted={
                                vessel.targetVessel !== null &&
                                vessel.targetVessel === i
                            }
                        />
                    ))}

                    <OrbitalCamera vessel={vessel} />
                </Canvas>
            </fieldset>
        </div>
    );
}

export default OrbitalMap;
