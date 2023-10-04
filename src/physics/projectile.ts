import { Environment } from "./environment";

// All objects in the simulation have the following properties.
export class Projectile {
    name: string;
    density: number; // kg / m^3
    mass: number; // kg
    radius: number; // m
    crossSectionalArea: number; // m^2
    volume: number; // m^3

    position: {x: number, y: number}; // m, m
    velocity = {x: 0, y: 0}

    constructor(name: string, density: number, position: {x: number, y: number}, radius: number) {
        this.name = name;
        this.density = density;
        this.position = position;
        this.radius = radius;
        this.crossSectionalArea = Math.PI * radius * radius;
        this.volume = 4/3 * Math.PI * radius * radius * radius; // NOTE: Currently only for balls. Would need adjusted for different shapes down the road.
        this.mass = density * this.volume;
    }

    computeDrag(environment: Environment) {
        const dragCoefficient = .47; // NOTE: This is only for spheres in fluids with Reynold's Number of [~10^4, ~10^5].

        // TODO: Make drag oppose direction of movement. Need to sample current velocity and apply in opposite direction.
        
        let forceOfDrag = {
            x: .5 * dragCoefficient * environment.density * -this.velocity.x * Math.abs(this.velocity.x) * this.crossSectionalArea,
            y: .5 * dragCoefficient * environment.density * this.velocity.y * Math.abs(this.velocity.y) * this.crossSectionalArea
        }
    
        return forceOfDrag;
    }

    // TODO: Update gravity if we want to vary the planet or other conditions.
    computeGravity(environment: Environment) {
        const forceOfGravity = {
            x: 0,
            y: environment.gravity * this.mass
        }
    
        return forceOfGravity;
    }

    // Simple buoyancy calculation using weight of displaced fluid (Archimedes' Principle).
    // TODO: Consider updating buoyancy to account for x-direction interactions on rigid bodies.
    computeBuoyancy(environment: Environment) {
        let forceOfBuoyancy = {
            x: 0,
            y: -environment.density * this.volume * environment.gravity
        };
    
        return forceOfBuoyancy;
    }

    draw() {
        // Drawing logic using Konva or Canvas
    }

}

interface PremadeProjectile {
    name: string,
    mass: number,
    position: {x: number, y: number},
    radius: number
}
// Premade environments to play with.
export let premadeProjectiles: PremadeProjectile[] = [
    
]