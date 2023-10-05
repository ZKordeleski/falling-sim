import { Circle, Layer, Rect, Stage } from "react-konva"
import { PremadeProjectile, Projectile } from "../../physics/projectile";
import { useEffect, useRef, useState } from "react";
import { updateProjectile } from "../../physics/updateProjectile";
import { Environment, PremadeEnvironment } from "../../physics/environment";
import "./SimulationPane.css";
import { Simulation } from "../../App";


// TODO: Add handler to setContainerSize on window resize.
interface SimulationPaneProps {
    simulation: Simulation,
    simContainerSize: {width: number, height: number},
    setSimulation: React.Dispatch<React.SetStateAction<Simulation>>}

function SimulationPane(props: SimulationPaneProps) {

  useEffect(() => {
    let animationFrameID: number;
    let lastUpdateTime: number = performance.now();

    function simulate() {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastUpdateTime;
      lastUpdateTime = currentTime;

      if (props.simulation.isPlaying) {
        // const updatedProjectile = updateProjectile([props.simulation.projectile], props.simulation.environment, deltaTime/1000);
        // props.setSimulation({...props.simulation, projectile: updatedProjectile[0], cumulativeTime: (props.simulation.cumulativeTime + deltaTime)});
        props.setSimulation((prev) => {
          const cumulativeTime = prev.cumulativeTime + deltaTime;
          const shouldLog = (Math.floor(prev.cumulativeTime/1000) !== Math.floor(cumulativeTime/1000));
          return ({
            ...prev,
            projectile: updateProjectile([prev.projectile], prev.environment, deltaTime/1000, shouldLog)[0],
            cumulativeTime: cumulativeTime,
            times: (shouldLog) ? [...prev.times, cumulativeTime] : prev.times
          });
        });
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
    <div className="SimulationPane">
      <Stage width={props.simContainerSize.width} height={props.simContainerSize.height}>
        <Layer>
          <Rect
            x={props.simContainerSize.width / 2}
            y={props.simContainerSize.height - 828}
            width={57}
            height={828} 
            fill="blue"
          />
          <Circle
            x={props.simContainerSize.width / 2}
            y={props.simulation.projectile.position.y}
            radius={props.simulation.projectile.radius}
            fill="red"
          />
        </Layer>
      </Stage>
    </div>
  )
}

export default SimulationPane