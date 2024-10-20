import argparse
import os
from pathlib import Path
import sys
from aiohttp import web
import asyncio
import socketio
import krpc
import math
from krpc.services.spacecenter import SASMode, VesselType
from krpc.services.krpc import GameScene
from dummy.dummy import GenerateDummyData

parser = argparse.ArgumentParser("ksp-command-center")
parser.add_argument(
    "--port",
    help="Port to host ksp-command-center on.",
    required=False,
    type=int,
    default=8085,
)
parser.add_argument(
    "--rpc_port", help="RPC port for KRPC.", required=False, type=int, default=50000
)
parser.add_argument(
    "--stream_port",
    help="Stream port for KRPC.",
    required=False,
    type=int,
    default=50001,
)
parser.add_argument(
    "--update_interval",
    help="The interval between data updates in seconds.",
    required=False,
    type=float,
    default=0.25,
)
parser.add_argument(
    "--dummy",
    help="Run the server in dummy mode feeding dummy data.",
    action="store_true",
)
args = parser.parse_args()

if args.dummy:
    conn = GenerateDummyData()
else:
    conn = krpc.connect(rpc_port=args.rpc_port, stream_port=50001)


def cross_product(u, v):
    return (
        u[1] * v[2] - u[2] * v[1],
        u[2] * v[0] - u[0] * v[2],
        u[0] * v[1] - u[1] * v[0],
    )


def dot_product(u, v):
    return u[0] * v[0] + u[1] * v[1] + u[2] * v[2]


def magnitude(v):
    return math.sqrt(dot_product(v, v))


def minus(u, v):
    return (u[0] - v[0], u[1] - v[1], u[2] - v[2])


def angle_between_vectors(u, v):
    dp = dot_product(u, v)
    if dp == 0:
        return 0
    um = magnitude(u)
    vm = magnitude(v)
    return math.acos(dp / (um * vm)) * (180.0 / math.pi)


sio = socketio.AsyncServer()

static_dir_path = Path("app")


@web.middleware
async def static_serve(request, handler):
    try:
        return await handler(request)
    except web.HTTPException as ex:
        if ex.status == 404:
            relative_file_path = Path(request.path).relative_to("/")  # remove root '/'
            file_path = static_dir_path / relative_file_path  # rebase into static dir
            if not file_path.exists():
                return web.HTTPNotFound()
            if file_path.is_dir():
                file_path /= "index.html"
                if not file_path.exists():
                    return web.HTTPNotFound()
            return web.FileResponse(file_path)

        raise


app = web.Application(
    middlewares=[static_serve], handler_args={"max_field_size": 16380}
)
sio.attach(app)


@sio.event
def connect(sid, environ):
    print("connect ", sid)


@sio.event
def disconnect(sid):
    print("disconnect ", sid)


@sio.on("next_stage")
def next_stage(sid):
    print(f"{sid}: next_stage()")
    vessel = conn.space_center.active_vessel
    vessel.control.activate_next_stage()


@sio.on("set_sas")
def set_sas(sid, value: bool):
    print(f"{sid}: set_sas({value})")
    vessel = conn.space_center.active_vessel
    vessel.control.sas = value


@sio.on("set_rcs")
def set_rcs(sid, value: bool):
    print(f"{sid}: set_rcs({value})")
    vessel = conn.space_center.active_vessel
    vessel.control.rcs = value


@sio.on("set_lights")
def set_lights(sid, value: bool):
    print(f"{sid}: set_lights({value})")
    vessel = conn.space_center.active_vessel
    vessel.control.lights = value


@sio.on("set_antennas")
def set_antennas(sid, value: bool):
    print(f"{sid}: set_antennas({value})")
    vessel = conn.space_center.active_vessel
    vessel.control.antennas = value


@sio.on("set_cargo_bays")
def set_cargo_bays(sid, value: bool):
    print(f"{sid}: set_cargo_bays({value})")
    vessel = conn.space_center.active_vessel
    vessel.control.cargo_bays = value


@sio.on("set_radiators")
def set_radiators(sid, value: bool):
    print(f"{sid}: set_radiators({value})")
    vessel = conn.space_center.active_vessel
    vessel.control.radiators = value


@sio.on("set_solar_panels")
def set_solar_panels(sid, value: bool):
    print(f"{sid}: set_solar_panels({value})")
    vessel = conn.space_center.active_vessel
    vessel.control.solar_panels = value


@sio.on("set_gear")
def set_gear(sid, value: bool):
    print(f"{sid}: set_gear({value})")
    vessel = conn.space_center.active_vessel
    vessel.control.gear = value


@sio.on("set_brakes")
def set_brakes(sid, value: bool):
    print(f"{sid}: set_brakes({value})")
    vessel = conn.space_center.active_vessel
    vessel.control.brakes = value


@sio.on("set_throttle")
def set_lights(sid, value: float):
    print(f"{sid}: set_throttle({value})")
    vessel = conn.space_center.active_vessel
    vessel.control.throttle = value


@sio.on("set_auto_pilot_mode")
def set_auto_pilot_mode(sid, value: str):
    print(f"{sid}: set_auto_pilot_mode({value})")
    vessel = conn.space_center.active_vessel
    vessel.auto_pilot.sas_mode = SASMode[value]


@sio.on("set_direction_control")
def set_direction_control(sid, pitch: float, yaw: float, roll: float):
    print(f"{sid}: set_direction_control({pitch}, {yaw}, {roll})")
    vessel = conn.space_center.active_vessel
    vessel.control.pitch = pitch
    vessel.control.yaw = yaw
    vessel.control.roll = roll


@sio.on("set_target_body")
def set_target_body(sid, value: str | None):
    print(f"{sid}: set_auto_pilot_mode({value})")
    if value is None:
        conn.space_center.clear_target()
        return

    if value not in conn.space_center.bodies:
        return

    matching = conn.space_center.bodies.get(value)

    conn.space_center.target_body = matching


@sio.on("set_target_vessel")
def set_target_vessel(sid, value: int | None):
    print(f"{sid}: set_target_vessel({value})")
    if value is None:
        conn.space_center.clear_target()
        return

    if len(conn.space_center.vessels) > value:
        matching = conn.space_center.vessels[value]
    else:
        matching = None

    conn.space_center.target_vessel = matching


@sio.on("set_action_group")
def set_action_group(sid, group: int, value: bool):
    print(f"{sid}: set_action_group({group}, {value})")
    conn.space_center.active_vessel.control.set_action_group(group, value)


async def listen_to_redis(app):
    while True:
        await asyncio.sleep(args.update_interval)
        try:
            if conn.krpc.current_game_scene != GameScene.flight:
                continue

            space_center = conn.space_center
            vessel = space_center.active_vessel
            orbit = vessel.orbit
            control = vessel.control

            sun = space_center.bodies.get("Sun")
            solar_reference_frame = sun.reference_frame

            if args.dummy:
                conn.tick(args.update_interval)

            orbital_surface_reference_frame = orbit.body.reference_frame
            surface_flight = vessel.flight(orbital_surface_reference_frame)

            flight = vessel.flight()

            resources = vessel.resources
            resources_in_current_stage = vessel.resources_in_decouple_stage(
                control.current_stage - 1
            )

            crew = []
            for crew_member in vessel.crew:
                crew.append(
                    {
                        "name": crew_member.name,
                        "trait": crew_member.trait,
                    }
                )

            actions = []
            for i in range(9):
                actions.append(vessel.control.get_action_group(i))

            bodies = []
            for body in space_center.bodies.values():
                solar_position = body.position(solar_reference_frame)
                position = {
                    "x": solar_position[0],
                    "y": solar_position[1],
                    "z": solar_position[2],
                }

                orbit_details = None
                if not body.is_star:
                    orbit_center = body.orbit.body.position(solar_reference_frame)
                    orbit_details = {
                        "center": {
                            "x": orbit_center[0],
                            "y": orbit_center[1],
                            "z": orbit_center[2],
                        },
                        "semiMajorAxis": body.orbit.semi_major_axis,
                        "eccentricity": body.orbit.eccentricity,
                        "inclination": body.orbit.inclination,
                    }

                bodies.append(
                    {
                        "name": body.name,
                        "radius": body.equatorial_radius,
                        "position": position,
                        "orbit": orbit_details,
                    }
                )

            target_vessel = None
            vessels = []
            for index, other_vessel in enumerate(space_center.vessels):
                if space_center.target_vessel == other_vessel:
                    target_vessel = index

                if other_vessel == vessel:
                    continue

                if other_vessel.type == VesselType.debris:
                    continue

                solar_position = other_vessel.position(solar_reference_frame)

                other_vessel_orbit = other_vessel.orbit
                other_vessel_orbit_center = other_vessel_orbit.body.position(
                    solar_reference_frame
                )
                other_vessel_orbit = {
                    "center": {
                        "x": other_vessel_orbit_center[0],
                        "y": other_vessel_orbit_center[1],
                        "z": other_vessel_orbit_center[2],
                    },
                    "semiMajorAxis": other_vessel_orbit.semi_major_axis,
                    "eccentricity": other_vessel_orbit.eccentricity,
                    "inclination": other_vessel_orbit.inclination,
                }

                position = {
                    "x": solar_position[0],
                    "y": solar_position[1],
                    "z": solar_position[2],
                }
                vessels.append(
                    {
                        "index": index,
                        "name": other_vessel.name,
                        "position": position,
                        "orbit": other_vessel_orbit,
                    }
                )

            target_body = None
            if space_center.target_body is not None:
                target_body = space_center.target_body.name

            time_to_apoapsis = orbit.time_to_apoapsis
            if math.isinf(time_to_apoapsis):
                time_to_apoapsis = "Infinity"

            time_to_periapsis = orbit.time_to_periapsis
            if math.isinf(time_to_periapsis):
                time_to_periapsis = "Infinity"

            prograde = flight.prograde

            # Get the direction of the vessel in the horizon plane
            horizon_direction = (0, prograde[1], prograde[2])

            # Compute the pitch - the angle between the vessels direction and
            # the direction in the horizon plane
            prograde_pitch = angle_between_vectors(prograde, horizon_direction)
            if prograde[0] < 0:
                prograde_pitch = -prograde_pitch

            # Compute the heading - the angle between north and
            # the direction in the horizon plane
            north = (0, 1, 0)
            prograde_yaw = angle_between_vectors(north, horizon_direction)
            if horizon_direction[2] < 0:
                prograde_yaw = 360 - prograde_yaw

            vessel_solar_position = vessel.position(solar_reference_frame)
            vessel_solar_velocity = vessel.velocity(solar_reference_frame)
            vessel_solar_rotation = vessel.rotation(solar_reference_frame)

            target_data = None
            if space_center.target_body != None:
                body_position = body.position(solar_reference_frame)
                position_diff = minus(vessel_solar_position, body_position)
                distance = magnitude(position_diff)

                body_velocity = body.velocity(solar_reference_frame)
                velocity_diff = minus(vessel_solar_velocity, body_velocity)
                speed = magnitude(velocity_diff)

                target_data = {
                    "name": space_center.target_body.name,
                    "distance": distance,
                    "velocity": speed,
                    "verticalVelocity": 0,
                    "horizontalVelocity": 0,
                }

            if space_center.target_vessel != None:
                other_vessel_position = other_vessel.position(solar_reference_frame)
                position_diff = minus(vessel_solar_position, other_vessel_position)
                distance = magnitude(position_diff)

                other_vessel_velocity = body.velocity(solar_reference_frame)
                velocity_diff = minus(vessel_solar_velocity, other_vessel_velocity)
                speed = magnitude(velocity_diff)

                target_data = {
                    "name": space_center.target_vessel.name,
                    "distance": distance,
                    "velocity": speed,
                    "verticalVelocity": 0,
                    "horizontalVelocity": 0,
                }

            vessel_orbit_center = orbit.body.position(solar_reference_frame)
            vessel_orbit = {
                "center": {
                    "x": vessel_orbit_center[0],
                    "y": vessel_orbit_center[1],
                    "z": vessel_orbit_center[2],
                },
                "semiMajorAxis": orbit.semi_major_axis,
                "eccentricity": orbit.eccentricity,
                "inclination": orbit.inclination,
            }

            data = {
                "universeTime": space_center.ut,
                "missionTime": vessel.met,
                "bodies": bodies,
                "vessels": vessels,
                "vessel": {
                    "name": vessel.name,
                    "orbit": vessel_orbit,
                    "position": {
                        "x": vessel_solar_position[0],
                        "y": vessel_solar_position[1],
                        "z": vessel_solar_position[2],
                    },
                    "rotation": {
                        "x": vessel_solar_rotation[0],
                        "y": vessel_solar_rotation[1],
                        "z": vessel_solar_rotation[2],
                        "w": vessel_solar_rotation[3],
                    },
                    "orbitingName": orbit.body.name,
                    "currentStage": control.current_stage,
                    "sas": control.sas,
                    "rcs": control.rcs,
                    "lights": control.lights,
                    "brakes": control.brakes,
                    "gear": control.gear,
                    "throttle": control.throttle,
                    "seaAltitude": flight.mean_altitude,
                    "surfaceAltitude": flight.surface_altitude,
                    "velocity": surface_flight.speed,
                    "verticalVelocity": surface_flight.vertical_speed,
                    "horizontalVelocity": surface_flight.horizontal_speed,
                    "orbitalVelocity": orbit.speed,
                    "apoapsis": orbit.apoapsis_altitude,
                    "periapsis": orbit.periapsis_altitude,
                    "timeToApoapsis": time_to_apoapsis,
                    "timeToPeriapsis": time_to_periapsis,
                    "inclination": orbit.inclination,
                    "eccentricity": orbit.eccentricity,
                    "autoPilotMode": vessel.auto_pilot.sas_mode.name,
                    "pitch": flight.pitch,
                    "heading": flight.heading,
                    "roll": flight.roll,
                    "pitchControl": control.pitch,
                    "yawControl": control.yaw,
                    "rollControl": control.roll,
                    "totalLiquidFuel": resources.amount("LiquidFuel"),
                    "totalMaxLiquidFuel": resources.max("LiquidFuel"),
                    "stageLiquidFuel": resources_in_current_stage.amount("LiquidFuel"),
                    "stageMaxLiquidFuel": resources_in_current_stage.max("LiquidFuel"),
                    "totalOxidizer": resources.amount("Oxidizer"),
                    "totalMaxOxidizer": resources.max("Oxidizer"),
                    "stageOxidizer": resources_in_current_stage.amount("Oxidizer"),
                    "stageMaxOxidizer": resources_in_current_stage.max("Oxidizer"),
                    "totalSolidFuel": resources.amount("SolidFuel"),
                    "totalMaxSolidFuel": resources.max("SolidFuel"),
                    "stageSolidFuel": resources_in_current_stage.amount("SolidFuel"),
                    "stageMaxSolidFuel": resources_in_current_stage.max("SolidFuel"),
                    "totalElectricCharge": resources.amount("ElectricCharge"),
                    "totalMaxElectricCharge": resources.max("ElectricCharge"),
                    "stageElectricCharge": resources_in_current_stage.amount(
                        "ElectricCharge"
                    ),
                    "stageMaxElectricCharge": resources_in_current_stage.max(
                        "ElectricCharge"
                    ),
                    "totalMonoPropellant": resources.amount("MonoPropellant"),
                    "totalMaxMonoPropellant": resources.max("MonoPropellant"),
                    "stageMonoPropellant": resources_in_current_stage.amount(
                        "MonoPropellant"
                    ),
                    "stageMaxMonoPropellant": resources_in_current_stage.max(
                        "MonoPropellant"
                    ),
                    "crew": crew,
                    "signalStrength": vessel.comms.signal_strength,
                    "antennas": vessel.control.antennas,
                    "cargo_bays": vessel.control.cargo_bays,
                    "radiators": vessel.control.radiators,
                    "solar_panels": vessel.control.solar_panels,
                    "actions": actions,
                    "targetBody": target_body,
                    "targetVessel": target_vessel,
                    "targetData": target_data,
                    "mass": vessel.mass,
                    "dryMass": vessel.dry_mass,
                    "crewCount": vessel.crew_count,
                    "crewCapacity": vessel.crew_capacity,
                    "situation": vessel.situation.name,
                    "progradePitch": prograde_pitch,
                    "progradeYaw": prograde_yaw,
                },
            }
            await sio.emit("dataUpdate", data)
        except Exception as e:
            _, _, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            print(e, fname, exc_tb.tb_lineno)


async def start_background_tasks(app):
    app["redis_listener"] = asyncio.create_task(listen_to_redis(app))


async def cleanup_background_tasks(app):
    app["redis_listener"].cancel()
    await app["redis_listener"]


if __name__ == "__main__":
    app.on_startup.append(start_background_tasks)
    app.on_cleanup.append(cleanup_background_tasks)
    web.run_app(app, port=8000)
