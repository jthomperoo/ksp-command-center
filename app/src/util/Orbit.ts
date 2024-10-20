import { Vector3D } from '../DataUpdate';

function GenerateOrbitalPath(
    semiMajorAxis: number,
    eccentricity: number,
    inclination: number,
    centralBodyPosition: Vector3D,
    samples: number,
): Vector3D[] {
    const points: Vector3D[] = [];

    for (let i = 0; i < samples; i++) {
        const theta = (2 * Math.PI * i) / samples;

        // Calculate r based on the true anomaly theta, with the eccentricity flipped
        const r =
            (semiMajorAxis * (1 - eccentricity * eccentricity)) /
            (1 - eccentricity * Math.cos(theta));

        // Coordinates in the orbital plane, adjusted to go through the X-axis
        const xPrime = r * Math.cos(theta);
        const zPrime = r * Math.sin(theta);

        // Rotate by inclination (around the X-axis)
        const xRot = xPrime;
        const yRot = zPrime * Math.sin(inclination);
        const zRot = zPrime * Math.cos(inclination);

        // Translate to the central body's position
        const x = centralBodyPosition.x + xRot;
        const y = centralBodyPosition.y + yRot;
        const z = centralBodyPosition.z + zRot;

        points.push({ x, y, z });
    }

    points.push({ ...points[0] });

    return points;
}

export { GenerateOrbitalPath };
