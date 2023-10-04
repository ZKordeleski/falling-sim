import { Circle, Layer, Stage } from "react-konva"
import { PremadeProjectile, Projectile } from "../../physics/projectile";
import Konva from "konva";
import { useEffect, useState } from "react";
import { updateProjectile } from "../../physics/updatePosition";
import { Environment, PremadeEnvironment } from "../../physics/environment";

interface SimulationWindowProps {
    simulation: {isPlaying: boolean, projectile: Projectile, environment: Environment},
    setSimulation: (simulation: {isPlaying: boolean, projectile: Projectile, environment: Environment}) => void;
    initialConditions: PremadeProjectile
}

function SimulationWindow(props: SimulationWindowProps) {
  useEffect(() => {
    let animationFrameID: number;
    let lastUpdateTime: number = performance.now();

    function simulate() {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastUpdateTime;
      lastUpdateTime = currentTime;

      if (props.simulation.isPlaying) {
        const updatedProjectile = updateProjectile([props.simulation.projectile], props.simulation.environment, deltaTime/1000);
        props.setSimulation({...props.simulation, projectile: updatedProjectile[0]});
        animationFrameID = requestAnimationFrame(simulate);
      }
    }

    if (props.simulation.isPlaying) {
      animationFrameID = requestAnimationFrame(simulate);
    }

    return () => {
      cancelAnimationFrame(animationFrameID);
    }
  }, [props.simulation.isPlaying, props.simulation.projectile, props.simulation.environment]);

  return (
    <div>
      <Stage width={500} height={500}>
        <Layer>
          <Circle
            x={props.simulation.projectile.position.x}
            y={props.simulation.projectile.position.y}
            radius={10}
            fill="red"
          />
        </Layer>
      </Stage>
    </div>
  )
}

export default SimulationWindow