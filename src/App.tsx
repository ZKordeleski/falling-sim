import { useEffect, useRef, useState } from 'react'
import './App.css'
import ChartPane from './features/Graphs/ChartsPane/ChartsPane'
import SummaryPane from './features/Graphs/SummaryPane/SummaryPane'
import PremadeSelectionsPane from './features/PremadeSelectionsPane/PremadeSelectionsPane'
import SimulationPane from './features/Simulation/SimulationPane'
import { Environment, PremadeEnvironment, premadeEnvironments } from './physics/environment'
import { PremadeProjectile, Projectile, premadeProjectiles } from './physics/projectile'
import { Simulate } from 'react-dom/test-utils'

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

  // -- SELECTION CONTROLS -- NOTE: There is an error when live adjusting the object's material mid flight at high velocities with drag.
  // Update projectile when a new selection is made.
  function updateProjectileMetrics(metrics: PremadeProjectile) {
    let updatedSimulation = {...simulation, isPlaying: false};
    updatedSimulation.projectile.position = {x: 0, y: simContainerSize.height - 828}; // TODO: Cleanup after adjusting starting position to mid canvas.
    updatedSimulation.projectile.velocity = {x: 0, y: 0};
    updatedSimulation.projectile.updateMetrics(metrics);
    setSimulation(updatedSimulation);
  }

  // Update environment when a new selection is made.
  function updateEnvironmentMetrics(metrics: PremadeEnvironment) {
    let updatedSimulation = {...simulation, isPlaying: false};
    updatedSimulation.projectile.position = {x: 0, y: simContainerSize.height - 828}; // TODO: Cleanup after adjusting starting position to mid canvas.
    updatedSimulation.projectile.velocity = {x: 0, y: 0};
    updatedSimulation.environment.updateMetrics(metrics);
    setSimulation(updatedSimulation);
  }

  // -- SIM CONTROLS --
  // Resets the projectile's motion and pauses the sim.
  function resetSimulation() {
    let updatedSimulation = {...simulation, isPlaying: false};
    updatedSimulation.projectile.position = {x: 0, y: simContainerSize.height - 828}; // TODO: Cleanup after adjusting starting position to mid canvas.
    updatedSimulation.projectile.velocity = {x: 0, y: 0};

    // Reset data logs for projectile and sim.
    updatedSimulation.projectile.history.position = [];
    updatedSimulation.projectile.history.velocity = [];
    updatedSimulation.projectile.history.gravity = [];
    updatedSimulation.projectile.history.drag = [];
    updatedSimulation.projectile.history.buoyancy = [];
    updatedSimulation.cumulativeTime = 0;

    setSimulation(updatedSimulation);
  }

  const startSimulation = () => setSimulation((prev) => ({...prev, isPlaying: true}));
  const pauseSimulation = () => setSimulation((prev) => ({...prev, isPlaying: false}));
  
  return (
    <div className="App">
      <div className="settings-window window">
        <div className="simulation-buttons">
          <button onClick={startSimulation}>Play</button>
          <button onClick={pauseSimulation}>Pause</button>
          <button onClick={resetSimulation}>Reset</button>
        </div>
        <div className="projectile-container">
          <span>Select a Projectile</span>
          <PremadeSelectionsPane premadeSelections={premadeProjectiles} updateMetrics={updateProjectileMetrics} />
        </div>
        <div className="environment-container">
          <span>Select an Environment</span>
          <PremadeSelectionsPane premadeSelections={premadeEnvironments} updateMetrics={updateEnvironmentMetrics} />
        </div>
      </div>
      <div className="simulation-window window" ref={simContainerRef}>
        <SimulationPane simulation={simulation} setSimulation={setSimulation} simContainerSize={simContainerSize} />
      </div>
      <div className="data-window window">
        <SummaryPane projectileVelocity={simulation.projectile.velocity.y} cumulativeTime={simulation.cumulativeTime} />
        <ChartPane timeData={simulation.times} metricData={simulation.projectile.history.velocity} title="Velocity" />
        <ChartPane timeData={simulation.times} metricData={simulation.projectile.history.gravity} title="Gravity" />
        <ChartPane timeData={simulation.times} metricData={simulation.projectile.history.drag} title="Drag" />
        <ChartPane timeData={simulation.times} metricData={simulation.projectile.history.buoyancy} title="Buoyancy" />
      </div>
    </div>
  )
}

export default App
