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
        this.volume = 4/3 * Math.PI * radius * radius * radius; // NOTE: Only for spheres.
        this.mass = density * this.volume; // NOTE: Only for spheres.
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

// Typing the premade projectile info used for the constructor.
export interface PremadeProjectile {
    name: string,
    density: number,
    position: {x: number, y: number},
    radius: number
}
// Premade projectiles to play with.
export let premadeProjectiles: PremadeProjectile[] = [
    {
        name: "Iron",
        density: 7800,
        position: {x: 100, y: 0},
        radius: .1
    },

    {
        name: "Helium",
        density: .18,
        position: {x: 100, y: 0},
        radius: .5
    },

    {
        name: "Lead",
        density: 11343,
        position: {x: 100, y: 0},
        radius: .1
    },

    {
        name: "Paper",
        density: 1201,
        position: {x: 100, y: 0},
        radius: 3
    },

    {
        name: "Iron",
        density: 7800,
        position: {x: 100, y: 0},
        radius: .1
    },

    {
        name: "Iron",
        density: 7800,
        position: {x: 100, y: 0},
        radius: .1
    },
]