import { Circle, Layer, Stage } from "react-konva"
import { PremadeProjectile, Projectile } from "../../physics/projectile";
import Konva from "konva";
import { useEffect, useState } from "react";
import { updateProjectile } from "../../physics/updatePosition";
import { Environment, PremadeEnvironment } from "../../physics/environment";

interface SimulationWindowProps {
    projectile: PremadeProjectile,
    environment: PremadeEnvironment
}

function SimulationWindow(props: SimulationWindowProps) {
  const [simulation, setSimulation] = useState({
    isPlaying: false,
    projectile: new Projectile(props.projectile.name, props.projectile.density, props.projectile.position, props.projectile.radius),
    environment: new Environment(props.environment.density, props.environment.gravity, props.environment.name)
  });

  useEffect(() => {
    let animationFrameID: number;
    let lastUpdateTime: number = performance.now();

    function simulate() {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastUpdateTime;
      lastUpdateTime = currentTime;

      if (simulation.isPlaying) {
        const updatedProjectile = updateProjectile([simulation.projectile], simulation.environment, deltaTime/1000);
        setSimulation((prev) => ({...prev, projectile: updatedProjectile[0]}));
        animationFrameID = requestAnimationFrame(simulate);
      }
    }

    if (simulation.isPlaying) {
      animationFrameID = requestAnimationFrame(simulate);
    }

    return () => {
      cancelAnimationFrame(animationFrameID);
    }
  }, [simulation.isPlaying, simulation.projectile, simulation.environment]);

  const startSimulation = () => setSimulation((prev) => ({ ...prev, isPlaying: true }));
  const pauseSimulation = () => setSimulation((prev) => ({ ...prev, isPlaying: false }));
  const resetSimulation = () => {
    pauseSimulation();
    setSimulation((prev) => ({
      ...prev,
      projectile: new Projectile(props.projectile.name, props.projectile.density, props.projectile.position, props.projectile.radius),
    }));
  };

  return (
    <div>
      <button onClick={startSimulation}>Play</button>
      <button onClick={pauseSimulation}>Pause</button>
      <button onClick={resetSimulation}>Reset</button>
      <Stage width={500} height={500}>
        <Layer>
          <Circle
            x={simulation.projectile.position.x}
            y={simulation.projectile.position.y}
            radius={10}
            fill="red"
          />
        </Layer>
      </Stage>
    </div>
  )
}

export default SimulationWindow