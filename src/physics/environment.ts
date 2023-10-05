import EarthIcon from "../assets/icons/earth.svg"
import JupiterIcon from "../assets/icons/jupiter.svg"
import MarsIcon from "../assets/icons/mars.svg"
import MoonIcon from "../assets/icons/moon.svg"
import NeptuneIcon from "../assets/icons/neptune.svg"
import SaturnIcon from "../assets/icons/saturn.svg"
import VenusIcon from "../assets/icons/venus.svg"


// The environment the object is falling through can be adjusted to demonstrate its unique effect.
export class Environment {
    name: string;
    density: number; // kg/m^3
    gravity: number; // m/s^2

    constructor(density: number, gravity: number = 9.81, name: string = "custom") {
        this.name = name;
        this.density = density;
        this.gravity = gravity;
    }

    updateMetrics(metrics: PremadeEnvironment) {
        this.name = metrics.name;
        this.density = metrics.density;
        this.gravity = metrics.gravity;
    }
}

// Typing premade environment info for constructor.
export interface PremadeEnvironment {
    name: string,
    density: number,
    gravity: number,
    icon: string
}

// Premade environments to play with.
export let premadeEnvironments: PremadeEnvironment[] = [
    {
        name: "Earth",
        density: 1.225,
        gravity: 9.81,
        icon: EarthIcon
    },

    {
        name: "Mars",
        density: .020,
        gravity: 3.71,
        icon: MarsIcon

    },

    {
        name: "Moon",
        density: 0, // NOTE: it's actually about 100 molecules of gas per cubic cm but come on...
        gravity: 1.62,
        icon: MoonIcon


    },

    {
        name: "Jupiter",
        density: 1330,
        gravity: 24.79,
        icon: JupiterIcon


    },

    {
        name: "Venus",
        density: 1.225,
        gravity: 10.44,
        icon: VenusIcon


    },

    {
        name: "Vacuum",
        density: 0,
        gravity: 9.81,
        icon: EarthIcon


    }
]