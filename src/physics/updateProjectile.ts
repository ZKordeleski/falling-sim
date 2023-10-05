import { Environment } from "./environment";
import { Projectile } from "./projectile";

export function updateProjectile(projectiles: Projectile[], environment: Environment, timeStep: number, log: boolean = false): Projectile[] {
    if (projectiles.length === 0) {
        return [];
    }

    let updatedProjectiles: Projectile[] = []

    for (let projectile of projectiles) {
        let drag = projectile.computeDrag(environment);

        let buoyancy = projectile.computeBuoyancy(environment);

        let gravity = projectile.computeGravity(environment);
        
        let netAcceleration = {
            x: (drag.x + buoyancy.x + gravity.x) / projectile.mass,
            y: (drag.y + buoyancy.y + gravity.y) / projectile.mass
        };

        console.log(netAcceleration);

        // Compute object's new position within 1 timestep and convert to pixels from meters.
        // NOTE: Tradeoff: You could use "requestAnimationFrame" here to handle the timing or sample the time to get time elapsed, but we run the risk of reduced accuracy / limited data. 
        projectile.position.x += (.5 * netAcceleration.x * Math.pow(timeStep, 2) + projectile.velocity.x * timeStep);
        projectile.position.y += (.5 * netAcceleration.y * Math.pow(timeStep, 2) + projectile.velocity.y * timeStep);

        // Compute object's new velocity within 1 timestep.
        // Terminal velocities were verified (with buoyancy condition) to be accurate by theoretical prediction.
        projectile.velocity.x += netAcceleration.x * timeStep;
        projectile.velocity.y += netAcceleration.y * timeStep;

        if (log) {
            projectile.history.drag.push(drag.y);
            projectile.history.buoyancy.push(buoyancy.y);
            projectile.history.gravity.push(gravity.y);
            projectile.history.position.push(projectile.position.y);
            projectile.history.velocity.push(projectile.velocity.y);
        }

        updatedProjectiles.push(projectile);
    }

    return updatedProjectiles;
}

// let i = 0;
// while (i < 6000) {
//     let updatedProjectile = updatePosition([ball], environment, 1/60);
//     if (i%60 === 0) {
//         console.log(JSON.parse((JSON.stringify(updatedProjectile[0].position.y))));
//     }
//     i++;
// }

//TODO: 1) Get canvas implemented. 2) Make sure falling object draws correctly. 3) End sim if object hits ground or at least stop it from moving. 4) Probably make environment just a state variable. 5) fallingObjects array also state variable?