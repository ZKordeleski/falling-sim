import Konva from "konva";
import { updatePosition } from "../../physics/updatePosition";
import { Projectile } from "../../physics/projectile";
import { Environment } from "../../physics/environment";

const stageHTML = document.createElement('div')
document.body.appendChild(stageHTML);

let stage = new Konva.Stage({
    container: stageHTML,
    width: window.innerWidth,
    height: window.innerHeight
});

let projectileLayer = new Konva.Layer();

let ball = new Projectile("Test", 41.8879, {x: 100, y: 0}, 1)
let environment = new Environment(1.225, 9.81, 1);

let projectile = new Konva.Circle({
    x: ball.position.x,
    y: ball.position.y,
    radius: 5,
    fill: "red"
});

let building = new Konva.Rect({
    x: 0,
    y: 0,
    width: 50,
    height: 381,
    fill: 'red'
})

projectileLayer.add(projectile);
projectileLayer.add(building);
stage.add(projectileLayer);

let i = 0;
let cumulativeTime = 0;

let animation = new Konva.Animation((frame) => {
    let timeStep = frame?.timeDiff || 0;
    cumulativeTime += timeStep;
    let updatedProjectile = updatePosition([ball], environment, timeStep/100)[0];
    console.log(updatedProjectile.velocity.y);
    projectile.position({x: updatedProjectile.position.x, y: updatedProjectile.position.y});
});

animation.start();