// The environment the object is falling through can be adjusted to demonstrate its unique effect.
export class Environment {
    name: string;
    density: number; // kg/m^3
    gravity: number; // m/s^2
    scale: number; // px / m

    constructor(density: number, gravity: number = 9.81, scale: number, name: string = "custom") {
        this.name = name;
        this.density = density;
        this.gravity = gravity;
        this.scale = scale;
    }
}

// Premade environments to play with.
export let premadeEnvironments: Environment[] = [

]