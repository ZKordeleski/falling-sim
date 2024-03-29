import { Environment } from "./environment";
import Asteroid from "../assets/icons/asteroid.svg"
import Astronaut from "../assets/icons/astronaut.svg"
import Helium from "../assets/icons/helium.svg"
import Iron from "../assets/icons/iron.svg"
import Lead from "../assets/icons/lead.svg"


// All objects in the simulation have the following properties.
export class Projectile {
    name: string;
    density: number; // kg / m^3
    radius: number; // m
    icon: string;

    position: {x: number, y: number} = {x: 100, y: 0}; // m, m
    velocity = {x: 0, y: 0}

    history: {
        position: number[],
        velocity: number[],
        gravity: number[],
        buoyancy: number[],
        drag: number[]
    } = {position: [], velocity: [], gravity: [], buoyancy: [], drag: []}

    constructor(name: string, density: number, radius: number, icon: string) {
        this.name = name;
        this.density = density;
        this.radius = radius;
        this.icon = icon;
    }

    get volume() { // m^3
        return 4/3 * Math.PI * this.radius * this.radius * this.radius;
    }

    get crossSectionalArea() { // m^2
        return Math.PI * this.radius * this.radius;
    }

    get mass() { // kg
        return this.density * this.volume;
    }

    computeDrag(environment: Environment) {
        const dragCoefficient = .47; // NOTE: This is only for spheres in fluids with Reynold's Number of [~10^4, ~10^5].

        // TODO: Make drag oppose direction of movement. Need to sample current velocity and apply in opposite direction.
        
        let forceOfDrag = {
            x: .5 * dragCoefficient * environment.density * -this.velocity.x * Math.abs(this.velocity.x) * this.crossSectionalArea,
            y: .5 * dragCoefficient * environment.density * -this.velocity.y * Math.abs(this.velocity.y) * this.crossSectionalArea
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

    updateMetrics(metrics: PremadeProjectile) {
        this.name = metrics.name;
        this.density = metrics.density;
        this.radius = metrics.radius;
        this.icon = metrics.icon;
    }

}

// Space Icons Credit to Good Stuff No Nonsense @ https://goodstuffnononsense.com/
// Typing the premade projectile info used for the constructor.
export interface PremadeProjectile {
    name: string,
    density: number,
    radius: number,
    icon: string
}
// Premade projectiles to play with.
export let premadeProjectiles: PremadeProjectile[] = [
    {
        name: "Iron",
        density: 7800,
        radius: 1,
        icon: Iron
    },

    {
        name: "Helium",
        density: .18,
        radius: 1,
        icon: Helium
    },

    {
        name: "Lead",
        density: 11343,
        radius: 1,
        icon: Lead
    },

    {
        name: "Human",
        density: 1000,
        radius: 1,
        icon: Astronaut
    },

    {
        name: "Asteroid", //https://en.wikipedia.org/wiki/Standard_asteroid_physical_characteristics
        density: 2710,
        radius: 1,
        icon: Asteroid
    }
]