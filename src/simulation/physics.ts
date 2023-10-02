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

    computeDrag(environment: Environment) {
        const dragCoefficient = .47; // NOTE: This is only for spheres in fluids with Reynold's Number of [~10^4, ~10^5].
        
        let forceOfDrag = {
            x: .5 * dragCoefficient * environment.density * Math.pow(this.velocity.x, 2) * this.crossSectionalArea,
            y: .5 * dragCoefficient * environment.density * Math.pow(this.velocity.y, 2) * this.crossSectionalArea
        }
    
        return forceOfDrag;
    }

    // TODO: Update gravity if we want to vary the planet or other conditions.
    computeGravity(environment: Environment) {
        const forceOfGravity = {
            x: 0,
            y: -9.81
        }
    
        return forceOfGravity;
    }

    // Simple buoyancy calculation using weight of displaced fluid (Archimedes' Principle).
    // TODO: Consider updating buoyancy to account for x-direction interactions on rigid bodies.
    computeBuoyancy(environment: Environment) {
        let forceOfBuoyancy = {
            x: 0,
            y: -environment.density * this.volume * environment.gravity
        }
    
        return forceOfBuoyancy;
    }

    draw() {
        context.beginPath();
        context.lineWidth = 6;
        context.strokeStyle = "white";    
        context.arc(this.position.x, this.position.y, 1, 0, 2 * Math.PI);
        context.stroke();
    }

}

// The environment the object is falling through can be adjusted to demonstrate its unique effect.
class Environment {
    density: number; // kg/m^3
    gravity: number; // m/s^2
    scale: number; // px / m
    timeStep: number; // seconds per frame

    constructor(density: number, gravity: number = 9.81, scale: number, timeStep: number = 1/30) {
        this.density = density;
        this.gravity = gravity;
        this.scale = scale;
        this.timeStep = timeStep;
    }
}

const canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
const ball = new FallingObject(1, 1, {x: 100, y: 0}, 5);
let environment = new Environment(1, 9.81, 1, 1/60);

function updateFallingObjects(fallingObjects: FallingObject[], environment: Environment) {
    if (fallingObjects.length === 0) {
        return;
    }

    for (let object of fallingObjects) {
        let drag = object.computeDrag(environment);
        let buoyancy = object.computeBuoyancy(environment);
        let gravity = object.computeGravity(environment);
        
        let netAcceleration = {
            x: (drag.x + buoyancy.x + gravity.x) / object.mass,
            y: (drag.y + buoyancy.y + gravity.y) / object.mass
        }

        console.log("Before: ", object.position, object.velocity);

        // Compute object's new position within 1 timestep and convert to pixels from meters.
        // NOTE: Tradeoff: You could use "requestAnimationFrame" here to handle the timing or sample the time to get time elapsed, but we run the risk of reduced accuracy / limited data. 
        object.position.x += (.5 * netAcceleration.x * Math.pow(environment.timeStep, 2) + object.velocity.x * environment.timeStep) * environment.scale;
        object.position.y += (.5 * netAcceleration.y * Math.pow(environment.timeStep, 2) + object.velocity.y * environment.timeStep) * environment.scale;

        // Compute object's new velocity within 1 timestep.
        object.velocity.x += netAcceleration.x * environment.timeStep;
        object.velocity.y += netAcceleration.y * environment.timeStep;

        console.log("After: ", object.position, object.velocity);
    }

    // TODO: Redraw canvas with new object positions, etc.
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let object of fallingObjects) {
        object.draw();
    }

}
updateFallingObjects([ball], environment);

//TODO: 1) Get canvas implemented. 2) Make sure falling object draws correctly. 3) End sim if object hits ground or at least stop it from moving. 4) Probably make environment just a state variable. 5) fallingObjects array also state variable?