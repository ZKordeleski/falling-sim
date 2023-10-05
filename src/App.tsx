import './App.css'
import { PremadeProjectile, Projectile, premadeProjectiles } from './physics/projectile'
import { Environment, PremadeEnvironment, premadeEnvironments } from './physics/environment'
import ProjectileSelectionPane from './features/ProjectileSelectionPane/ProjectileSelectionPane'
import { useEffect, useRef, useState } from 'react'
import SimulationPane from './features/Simulation/SimulationPane'
import SummaryPane from './features/Graphs/SummaryPane/SummaryPane'
import ChartPane from './features/Graphs/ChartsPane/ChartsPane'
import EnvironmentSelectionPane from './features/EnvironmentSelectionPane/EnvironmentSelectionPane'
import PremadeSelectionsPane from './features/PremadeSelectionsPane/PremadeSelectionsPane'
import { SvgIcon } from '@mui/material'

export interface Simulation {
  isPlaying: boolean,
  projectile: Projectile,
  environment: Environment,
  cumulativeTime: number,
  times: number[]
}

let defaultSimulation: Simulation = {
  isPlaying: false,
  projectile: new Projectile(premadeProjectiles[0].name, premadeProjectiles[0].density, premadeProjectiles[0].radius),
  environment: new Environment(premadeEnvironments[0].density, premadeEnvironments[0].gravity, premadeEnvironments[0].name),
  cumulativeTime: 0,
  times: []
}

function App() {
  const [simulation, setSimulation] = useState(defaultSimulation);
  const [simContainerSize, setsimContainerSize] = useState<{width: number, height: number}>({width: 0, height: 0});
  const simContainerRef = useRef<HTMLDivElement>(null);
  
  // Gets the current container size for passing into the Konva Stage.
  useEffect (() => {
    if (!simContainerRef.current) {
      return;
    }

    const containerWidth = simContainerRef.current.offsetWidth;
    const containerHeight = simContainerRef.current.offsetHeight;

    setsimContainerSize({width: containerWidth, height: containerHeight})
    resetSimulation(); // NOTE: Hack to set the ball height to top of building.
  }, [simContainerRef.current])

  // -- SELECTION CONTROLS --
  // Update projectile when a new selection is made.
  function updateProjectileMetrics(metrics: PremadeProjectile) {
    let updatedSimulation = {...simulation};
    updatedSimulation.projectile.updateMetrics(metrics);
    setSimulation(updatedSimulation);
  }

  // Update environment when a new selection is made.
  function updateEnvironmentMetrics(metrics: PremadeEnvironment) {
    let updatedSimulation = {...simulation};
    updatedSimulation.environment.updateMetrics(metrics);
    setSimulation(updatedSimulation);
  }

  // -- SIM CONTROLS --
  // Resets the projectile's motion and pauses the sim.
  function resetSimulation() {
    let updatedSimulation = {...simulation, isPlaying: false};
    updatedSimulation.projectile.position = {x: 0, y: simContainerSize.height - 828}; // TODO: Cleanup after adjusting starting position to mid canvas.
    updatedSimulation.projectile.velocity = {x: 0, y: 0};
    updatedSimulation.cumulativeTime = 0;
    setSimulation(updatedSimulation);
  }

  const startSimulation = () => setSimulation((prev) => ({...prev, isPlaying: true}));
  const pauseSimulation = () => setSimulation((prev) => ({...prev, isPlaying: false}));

  let dummyTime = [0, 1, 2, 3, 4, 5, 6, 10, 15, 27];
  let dummyMetric = [5, 10, 15, 20, 25, 21, 17, 18, 19, 8];
  
  return (
    <div className="App">
      <div className="settings-window window">
        <div className="simulation-buttons">
          <button onClick={startSimulation}>Play</button>
          <button onClick={pauseSimulation}>Pause</button>
          <button onClick={resetSimulation}>Reset</button>
        </div>
        <ProjectileSelectionPane premadeProjectiles={premadeProjectiles} updateProjectileMetrics={updateProjectileMetrics} />
        <PremadeSelectionsPane premadeSelections={premadeEnvironments} updateMetrics={updateEnvironmentMetrics} />
      </div>
      <div className="simulation-window window" ref={simContainerRef}>
        <SimulationPane simulation={simulation} setSimulation={setSimulation} simContainerSize={simContainerSize} />
      </div>
      <div className="data-window window">
        <SummaryPane projectileVelocity={simulation.projectile.velocity.y} cumulativeTime={simulation.cumulativeTime} />
        <ChartPane timeData={simulation.times} metricData={simulation.projectile.history.velocity} title="Dummy Data" />
        <ChartPane timeData={dummyTime} metricData={dummyMetric} title="Dummy Data" />
        <ChartPane timeData={dummyTime} metricData={dummyMetric} title="Dummy Data" />
        <ChartPane timeData={dummyTime} metricData={dummyMetric} title="Dummy Data" />
      </div>
    </div>
  )
}

export default App
