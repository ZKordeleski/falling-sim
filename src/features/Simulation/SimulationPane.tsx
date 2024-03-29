import { useEffect } from "react";
import { Image, Layer, Stage } from "react-konva";
import useImage from "use-image";
import { Simulation } from "../../App";
import EmpireStateBuilding from "../../assets/empire-state-building.svg";
import { updateProjectile } from "../../physics/updateProjectile";
import "./SimulationPane.css";

export const scaleImageHeight = 381;

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
          const shouldLog = (Math.floor(prev.cumulativeTime/100) !== Math.floor(cumulativeTime/100));
          return ({
            ...prev,
            projectile: updateProjectile(prev, deltaTime/1000, shouldLog)[0],
            cumulativeTime: cumulativeTime,
            times: (shouldLog) ? [...prev.times, prev.cumulativeTime] : prev.times
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
  }, [props.simulation.isPlaying]);

  const [image] = useImage(props.simulation.projectile.icon);  

  return (
    <div className="SimulationPane">
      <img src={EmpireStateBuilding} height={381} style={{position: "absolute", bottom: 0}}/>
      <Stage width={props.simContainerSize.width} height={props.simContainerSize.height}>
        <Layer>
        <Image 
          image={image} 
          x={props.simContainerSize.width / 2} 
          y={props.simulation.projectile.position.y}
          height={30}
          width={30}
        />
        </Layer>
      </Stage>
    </div>
  )
}

export default SimulationPane