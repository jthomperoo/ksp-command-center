from dataclasses import dataclass
from typing import Dict, List
from krpc.services.spacecenter import SASMode, VesselSituation, VesselType
from krpc.services.krpc import GameScene


@dataclass
class ReferenceFrame:
    pass


@dataclass
class Comms:
    signal_strength: float


@dataclass
class CrewMember:
    name: str
    trait: str


@dataclass
class Body:
    name: str
    reference_frame: ReferenceFrame
    dummy_position: tuple[float, float, float]

    def position(self, reference_frame):
        return self.dummy_position


@dataclass
class Orbit:
    body: Body

    speed: float = 0
    apoapsis_altitude: float = 0
    periapsis_altitude: float = 0
    time_to_periapsis: float = 0
    time_to_apoapsis: float = 0
    inclination: float = 0
    eccentricity: float = 0
    semi_major_axis: float = 0


@dataclass
class Control:
    current_stage: int
    sas: bool
    rcs: bool
    lights: bool
    brakes: bool
    gear: bool
    throttle: float
    pitch: float
    yaw: float
    roll: float

    antennas: bool
    cargo_bays: bool
    radiators: bool
    solar_panels: bool

    def get_action_group(self, i):
        return False

    def set_action_group(self, i, b):
        pass

    def activate_next_stage(self):
        pass


@dataclass
class Flight:
    mean_altitude: float
    surface_altitude: float
    speed: float
    vertical_speed: float
    horizontal_speed: float
    pitch: float
    heading: float
    roll: float
    prograde: tuple[float, float, float]
    direction: tuple[float, float, float]


@dataclass
class Resources:
    def amount(self, name):
        return 50

    def max(self, name):
        return 100


@dataclass
class AutoPilot:
    sas_mode: SASMode


@dataclass
class Vessel:
    name: str
    met: int
    orbit: Orbit
    control: Control
    resources: Resources
    auto_pilot: AutoPilot
    surface_reference_frame: ReferenceFrame
    reference_frame: ReferenceError
    crew: List[CrewMember]
    comms: Comms
    mass: float
    dry_mass: float
    crew_count: int
    crew_capacity: int
    situation: VesselSituation
    type: VesselType
    dummy_position: tuple[float, float, float]
    dummy_velocity: tuple[float, float, float]
    dummy_rotation: tuple[float, float, float, float]

    def position(self, reference_frame):
        return self.dummy_position

    def direction(self, reference_frame):
        return (0, 0, 0)

    def velocity(self, reference_frame):
        return self.dummy_velocity

    def rotation(self, reference_frame):
        return self.dummy_rotation

    def flight(self, reference_frame=None):
        return Flight(
            mean_altitude=10000,
            surface_altitude=8000,
            speed=300,
            vertical_speed=200,
            horizontal_speed=100,
            pitch=90,
            heading=0,
            roll=0,
            prograde=[1, 0, 0],
            direction=[1, 0, 0],
        )

    def resources_in_decouple_stage(self, stage):
        return Resources()


@dataclass
class CelestialBody:
    name: str
    orbit: Orbit
    reference_frame: ReferenceFrame
    equatorial_radius: float
    dummy_position: tuple[float, float, float]
    dummy_velocity: tuple[float, float, float]
    is_star: bool = False

    def position(self, reference_frame):
        return self.dummy_position

    def velocity(self, reference_frame):
        return self.dummy_velocity


@dataclass
class SpaceCenter:
    ut: int
    active_vessel: Vessel
    bodies: Dict[str, CelestialBody]
    target_body: CelestialBody | None
    vessels: List[Vessel]
    target_vessel: Vessel | None = None

    def transform_direction(self, direction, from_, to):
        return [0, 1, 0]

    def clear_target(self):
        self.target_body = None


@dataclass
class KRPC:
    current_game_scene: GameScene


@dataclass
class Dummy:
    space_center: SpaceCenter
    krpc: KRPC

    def tick(self, update_interval):
        self.space_center.active_vessel.met += update_interval
        self.space_center.ut += update_interval
        # for body in self.space_center.bodies.values():
        #     if body.is_star:
        #         continue
        #     body.dummy_position[2] += 10000
        # self.space_center.active_vessel.dummy_position[2] += 10000


def GenerateDummyData():
    reference_frame = ReferenceFrame()

    sun_body = Body(
        name="Sun", reference_frame=reference_frame, dummy_position=[0, 0, 0]
    )
    kerbin_body = Body(
        name="Kerbin",
        reference_frame=reference_frame,
        dummy_position=[-13596667889, 0, 293729955],
    )
    mun_body = Body(
        name="Mun", reference_frame=reference_frame, dummy_position=[13611840256, 0, 0]
    )

    sun = CelestialBody(
        name="Sun",
        is_star=True,
        equatorial_radius=261600000,
        dummy_position=[0, 0, 0],
        dummy_velocity=[0, 0, 0],
        orbit=Orbit(body=sun_body),
        reference_frame=reference_frame,
    )
    kerbin = CelestialBody(
        name="Kerbin",
        equatorial_radius=600000,
        dummy_position=[-13596667889, 0, 293729955],
        dummy_velocity=[100, 0, 0],
        orbit=Orbit(
            body=sun_body,
            semi_major_axis=13599840256,
            eccentricity=0,
            inclination=0,
        ),
        reference_frame=reference_frame,
    )
    mun = CelestialBody(
        name="Mun",
        equatorial_radius=200000,
        dummy_position=[13611840256, 0, 0],
        dummy_velocity=[150, 0, 0],
        orbit=Orbit(
            body=kerbin_body, semi_major_axis=12000000, eccentricity=0, inclination=0
        ),
        reference_frame=reference_frame,
    )
    duna = CelestialBody(
        name="Duna",
        equatorial_radius=320000,
        dummy_position=[21783189163, 0, 0],
        dummy_velocity=[200, 0, 0],
        orbit=Orbit(
            body=sun_body,
            semi_major_axis=20726155264,
            eccentricity=0.051,
            inclination=0.06,
        ),
        reference_frame=reference_frame,
    )

    auto_pilot = AutoPilot(sas_mode=SASMode.stability_assist)

    orbit = Orbit(
        body=kerbin_body,
        speed=3000,
        apoapsis_altitude=70000,
        periapsis_altitude=70000,
        time_to_apoapsis=1000,
        time_to_periapsis=600,
        semi_major_axis=429938,
        eccentricity=0.996,
        inclination=0.0019,
    )

    control = Control(
        current_stage=3,
        sas=True,
        rcs=False,
        lights=True,
        brakes=False,
        gear=True,
        throttle=0.75,
        pitch=0,
        yaw=0,
        roll=0,
        antennas=False,
        cargo_bays=True,
        radiators=False,
        solar_panels=True,
    )

    resources = Resources()

    comms = Comms(signal_strength=0.5)

    crewMember = CrewMember(name="Billy Plop-Pants", trait="Pilot")

    crew = [crewMember]

    other_vessel = Vessel(
        name="Other",
        dummy_position=[mun.dummy_position[0] + mun.equatorial_radius + 50000, 0, 0],
        dummy_rotation=[0, 0, 0, 1],
        dummy_velocity=[150, 0, 0],
        met=1000,
        orbit=Orbit(
            body=mun_body,
            apoapsis_altitude=50000,
            periapsis_altitude=40000,
            eccentricity=0,
            inclination=0.3,
            semi_major_axis=mun.equatorial_radius + 50000,
            speed=100,
            time_to_apoapsis=1000,
            time_to_periapsis=1000,
        ),
        control=control,
        resources=resources,
        surface_reference_frame=reference_frame,
        reference_frame=reference_frame,
        auto_pilot=auto_pilot,
        crew=crew,
        comms=comms,
        situation=VesselSituation.orbiting,
        mass=100,
        dry_mass=80,
        crew_count=1,
        crew_capacity=2,
        type=VesselType.ship,
    )

    vessel = Vessel(
        name="Dummy",
        met=1000,
        dummy_position=[-13596140984, -1131, 294145273],
        # dummy_position=[kerbin.dummy_position[0] + kerbin.equatorial_radius + 70000, kerbin.dummy_position[1], kerbin.dummy_position[2]],
        dummy_rotation=[0, 0, 0, 1],
        dummy_velocity=[1000, 0, 0],
        orbit=orbit,
        control=control,
        resources=resources,
        surface_reference_frame=reference_frame,
        reference_frame=reference_frame,
        auto_pilot=auto_pilot,
        crew=crew,
        comms=comms,
        situation=VesselSituation.orbiting,
        mass=100,
        dry_mass=80,
        crew_count=1,
        crew_capacity=2,
        type=VesselType.ship,
    )

    bodies = {"Sun": sun, "Kerbin": kerbin, "Mun": mun, "Duna": duna}

    space_center = SpaceCenter(
        active_vessel=vessel,
        vessels=[vessel, other_vessel],
        ut=1000,
        bodies=bodies,
        target_body=bodies["Mun"],
    )
    krpc = KRPC(current_game_scene=GameScene.flight)
    return Dummy(space_center=space_center, krpc=krpc)
