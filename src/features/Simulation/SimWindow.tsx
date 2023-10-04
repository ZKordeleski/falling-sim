import { Circle, Layer, Stage } from "react-konva"
import { Projectile } from "../../physics/projectile";
import Konva from "konva";
import { useEffect, useState } from "react";
import { updatePosition } from "../../physics/updatePosition";
import { Environment } from "../../physics/environment";

interface SimulationProps {
    projectiles: Projectile[],
    environment: Environment
}

function Simulation(props: SimulationProps) {
  const [play, setPlay] = useState(true);
  const [projectiles, setProjectiles] = useState([new Projectile("Test", 1, {x: 100, y: 0}, .05)]);
  
  if (play) {
    let animation = new Konva.Animation((frame) => {
      let timeStep = frame?.timeDiff || 0;

      let updatedProjectiles = updatePosition(projectiles, props.environment, timeStep);

      if (updatedProjectiles) {
        setProjectiles(updatedProjectiles);
      }

      animation.start();
  }, );

  let konvaDrawings = [];
  for (let projectile of projectiles) {
      konvaDrawings.push(<Circle x={projectile.position.x} y={projectile.position.y} radius={projectile.radius*100} fill="red" key={projectile.name} />)
  }

    return (
      <>
        {/* <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {konvaDrawings}
          </Layer>
        </Stage> */}
      </>
    )
  }
}
export default Simulation