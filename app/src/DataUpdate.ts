interface DataUpdate {
    vessel?: VesselData;
    universeTime: number;
    missionTime: number;
    bodies: CelestialBody[];
    vessels: OtherVessel[];
}

interface Orbit {
    center: Vector3D;
    semiMajorAxis: number;
    eccentricity: number;
    inclination: number;
}

interface CelestialBody {
    name: string;
    radius: number;
    position: Vector3D;
    orbit: Orbit | null;
}

interface OtherVessel {
    index: number;
    name: string;
    position: Vector3D;
    orbit: Orbit;
}

interface Vector3D {
    x: number;
    y: number;
    z: number;
}

interface Vector4D {
    x: number;
    y: number;
    z: number;
    w: number;
}

interface CrewMember {
    name: string;
    trait: string;
}

interface TargetData {
    name: string;
    distance: number;
    velocity: number;
    verticalVelocity: number;
    horizontalVelocity: number;
}

type AutoPilotMode =
    | 'stability_assist'
    | 'maneuver'
    | 'prograde'
    | 'retrograde'
    | 'normal'
    | 'anti_normal'
    | 'radial'
    | 'anti_radial'
    | 'target'
    | 'anti_target';
type VesselSituation =
    | 'docked'
    | 'escaping'
    | 'flying'
    | 'landed'
    | 'orbiting'
    | 'pre_launch'
    | 'splashed'
    | 'sub_orbital';

interface VesselData {
    name: string;

    orbitingName: string;

    position: Vector3D;
    rotation: Vector4D;

    orbit: Orbit;

    sas: boolean;
    rcs: boolean;
    lights: boolean;
    gear: boolean;
    brakes: boolean;

    antennas: boolean;
    cargoBays: boolean;
    radiators: boolean;
    solarPanels: boolean;

    autoPilotMode: AutoPilotMode;

    throttle: number;

    seaAltitude: number;
    surfaceAltitude: number;
    velocity: number;
    verticalVelocity: number;
    horizontalVelocity: number;
    apoapsis: number;
    periapsis: number;
    timeToApoapsis: number;
    timeToPeriapsis: number;
    inclination: number;
    eccentricity: number;
    orbitalVelocity: number;

    currentStage: number;

    totalLiquidFuel: number;
    totalMaxLiquidFuel: number;
    stageLiquidFuel: number;
    stageMaxLiquidFuel: number;

    totalOxidizer: number;
    totalMaxOxidizer: number;
    stageOxidizer: number;
    stageMaxOxidizer: number;

    totalSolidFuel: number;
    totalMaxSolidFuel: number;
    stageSolidFuel: number;
    stageMaxSolidFuel: number;

    totalElectricCharge: number;
    totalMaxElectricCharge: number;
    stageElectricCharge: number;
    stageMaxElectricCharge: number;

    totalMonoPropellant: number;
    totalMaxMonoPropellant: number;
    stageMonoPropellant: number;
    stageMaxMonoPropellant: number;

    pitch: number;
    heading: number;
    roll: number;

    pitchControl: number;
    yawControl: number;
    rollControl: number;

    crew: CrewMember[];

    signalStrength: number;

    actions: boolean[];

    targetBody: string | null;
    targetVessel: number | null;
    targetData: TargetData | null;

    mass: number;
    dryMass: number;
    crewCount: number;
    crewCapacity: number;
    situation: VesselSituation;

    progradePitch: number;
    progradeYaw: number;
}

export type {
    AutoPilotMode,
    CelestialBody,
    CrewMember,
    DataUpdate,
    OtherVessel,
    TargetData,
    Vector3D,
    VesselData,
    VesselSituation,
};
