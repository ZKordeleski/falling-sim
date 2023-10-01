// All objects in the simulation have the following properties.
class FallingObject {
    mass: number; // kg
    density: number; // kg / m^3
    crossSectionalArea: number; // m^2
    volume: number; // m^3


    position: {x: number, y: number}; // px, px
    velocity = {x: 0, y: 0}

    constructor(mass: number, density: number, position: {x: number, y: number}, radius: number) {
        this.mass = mass;
        this.density = density;
        this.position = position;
        this.crossSectionalArea = Math.PI * radius * radius;
        this.volume = 4/3 * Math.PI * radius * radius * radius; // NOTE: Currently only for balls. Would need adjusted for different shapes down the road.
    }
}

// The environment the object is falling through can be adjusted to demonstrate its unique effect.
class Environment {
    density: number; // kg/m^3
    gravity: number; // m/s^2
    scale: number; // px / m
    framerate: number; // seconds per frame

    constructor(density: number, gravity: number = 9.81, scale: number, framerate: number = 1/40) {
        this.density = density;
        this.gravity = gravity;
        this.scale = scale;
        this.framerate = framerate;
    }
}

// Computing necessary forces to determine kinematics.
function computeDrag(object: FallingObject, environment: Environment) {
    const dragCoefficient = .47; // NOTE: This is only for spheres in fluids with Reynold's Number of [~10^4, ~10^5].
    
    let forceOfDrag = {
        x: .5 * dragCoefficient * environment.density * Math.pow(object.velocity.x, 2) * object.crossSectionalArea,
        y: .5 * dragCoefficient * environment.density * Math.pow(object.velocity.y, 2) * object.crossSectionalArea
    }

    return forceOfDrag;
}

// TODO: Update gravity if we want to vary the planet or other conditions.
function computeGravity(object: FallingObject, environment: Environment) {
    const forceOfGravity = {
        x: 0,
        y: -9.81
    }

    return forceOfGravity;
}

// Simple buoyancy calculation using weight of displaced fluid (Archimedes' Principle).
// TODO: Consider updating buoyancy to account for x-direction interactions on rigid bodies.
function computeBuoyancy(object: FallingObject, environment: Environment) {
    let forceOfBuoyancy = {
        x: 0,
        y: -environment.density * object.volume * environment.gravity
    }

    return forceOfBuoyancy;
}

function updateFallingObjects(fallingObjects: FallingObject[], environment: Environment) {
    if (fallingObjects.length === 0) {
        return;
    }

    for (let object of fallingObjects) {
        let drag = computeDrag(object, environment);
        let buoyancy = computeBuoyancy(object, environment);
        let gravity = computeGravity(object, environment);

        let netAcceleration = {
            x: (drag.x + buoyancy.x + gravity.x) / object.mass,
            y: (drag.y + buoyancy.y + gravity.y) / object.mass
        }

        // Compute object's new position within 1 frame and convert to pixels from meters.
        object.position.x += (.5 * netAcceleration.x * Math.pow(environment.framerate, 2) + object.velocity.x * environment.framerate) * environment.scale;
        object.position.y += (.5 * netAcceleration.y * Math.pow(environment.framerate, 2) + object.velocity.y * environment.framerate) * environment.scale;

        // Compute object's new velocity within 1 frame.
        object.velocity.x += netAcceleration.x * environment.framerate;
        object.velocity.y += netAcceleration.y * environment.framerate;
    }

    // TODO: Redraw canvas with new object positions, etc.
}

//TODO: 1) Get canvas implemented. 2) Make sure falling object draws correctly. 3) End sim if object hits ground or at least stop it from moving. 4) Probably make environment just a state variable. 5) fallingObjects array also state variable?