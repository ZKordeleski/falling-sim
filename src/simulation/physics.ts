// If we decide we'd like to consider multiple shapes, this could be useful down the road.
interface Shape {
    numberOfSides: number,
    crossSectionalArea: number
}

// All objects in the simulation have the following properties.
class FallingObject {
    mass: number; // in kilograms.
    density: number; // in kg / m^3
    volume: number;
    position: {x: number, y:number}; // scale is adjustable (e.g. 1px = 1cm or 1px = 1m etc.)
    
    constructor(mass: number, density: number, position: {x: number, y: number}, radius: number, shape?: Shape) {
        this.mass = mass;
        this.density = density;
        this.position = position;
        this.volume = Math.PI * radius * radius; // NOTE: Currently only for balls. Would need adjusted for different shapes down the road.
    }
}

class Environment {
    density: number; // in kg/m^3
    scale: number; // in px / m

    constructor(density: number, scale: number) {
        this.density = density;
        this.scale = scale;
    }
}

