import { useEffect, useRef, useState } from 'react'
import './App.css'
import ChartPane from './features/Graphs/ChartsPane/ChartsPane'
import SummaryPane from './features/Graphs/SummaryPane/SummaryPane'
import PremadeSelectionsPane from './features/PremadeSelectionsPane/PremadeSelectionsPane'
import SimulationPane, { scaleImageHeight } from './features/Simulation/SimulationPane'
import { Environment, PremadeEnvironment, premadeEnvironments } from './physics/environment'
import { PremadeProjectile, Projectile, premadeProjectiles } from './physics/projectile'

export interface Simulation {
  isPlaying: boolean,
  projectile: Projectile,
  environment: Environment,
  cumulativeTime: number,
  ground: number,
  times: number[]
}

let defaultSimulation: Simulation = {
  isPlaying: false,
  projectile: new Projectile(premadeProjectiles[0].name, premadeProjectiles[0].density, premadeProjectiles[0].radius, premadeProjectiles[0].icon),
  environment: new Environment(premadeEnvironments[0].density, premadeEnvironments[0].gravity, premadeEnvironments[0].name),
  cumulativeTime: 0,
  ground: 830,
  times: [0]
}

function App() {
  const [simulation, setSimulation] = useState(defaultSimulation);
  const [simContainerSize, setSimContainerSize] = useState<{width: number, height: number}>({width: 0, height: 0});
  const simContainerRef = useRef<HTMLDivElement>(null);
  
  // Gets the current container size for passing into the Konva Stage.
  useEffect (() => {
    if (!simContainerRef.current) {
      return;
    }

    // Resize canvases when window adjusted.
    const measureContainer = () => {
      const containerWidth = simContainerRef.current!.offsetWidth;
      const containerHeight = simContainerRef.current!.offsetHeight;
  
      setSimContainerSize({width: containerWidth, height: containerHeight})
    }

    // NOTE: Hack to set the ball height to top of building.
    setTimeout(() => {measureContainer(); resetSimulation();}, 100);

    window.onresize = measureContainer;

  }, [simContainerRef.current])

  // -- SELECTION CONTROLS -- NOTE: There is an error when live adjusting the object's material mid flight at high velocities with drag.
  // Update projectile when a new selection is made.
  function updateProjectileMetrics(metrics: PremadeProjectile) {
    let updatedSimulation = {...simulation, isPlaying: false};
    updatedSimulation.projectile.updateMetrics(metrics);
    setSimulation(updatedSimulation);
    resetSimulation();  
  }

  // Update environment when a new selection is made.
  function updateEnvironmentMetrics(metrics: PremadeEnvironment) {
    let updatedSimulation = {...simulation, isPlaying: false};
    updatedSimulation.environment.updateMetrics(metrics);
    setSimulation(updatedSimulation);
    resetSimulation();
  }

  // -- SIM CONTROLS --
  // Resets the projectile's motion and pauses the sim.
  function resetSimulation() {
    let updatedSimulation = {...simulation, isPlaying: false};
    updatedSimulation.projectile.position = {x: 0, y: simContainerSize.height - scaleImageHeight}; // TODO: Cleanup after adjusting starting position to mid canvas.
    updatedSimulation.projectile.velocity = {x: 0, y: 0};

    // Reset data logs for projectile and sim.
    updatedSimulation.times = [];
    updatedSimulation.projectile.history.position = [simContainerSize.height - scaleImageHeight];
    updatedSimulation.projectile.history.velocity = [];
    updatedSimulation.projectile.history.gravity = [];
    updatedSimulation.projectile.history.drag = [];
    updatedSimulation.projectile.history.buoyancy = [];
    updatedSimulation.cumulativeTime = 0;

    setSimulation(updatedSimulation);
  }

  const startSimulation = () => setSimulation((prev) => ({...prev, isPlaying: true, ground: simContainerSize.height}));
  const pauseSimulation = () => setSimulation((prev) => ({...prev, isPlaying: false}));
  
  // TODO: Extract the data displays to their own component / hookup summary pane to cycle an array.
  return (
    <div className="App">
      <div className="settings-window window">
        <div className="simulation-buttons">
          <button onClick={startSimulation}>Play</button>
          <button onClick={pauseSimulation}>Pause</button>
          <button onClick={resetSimulation}>Reset</button>
        </div>
        <span className="driving-question">
          What happens when you drop a {simulation.projectile.radius}m SPHERE made of {simulation.projectile.name.toUpperCase()} on {simulation.environment.name.toUpperCase()}?
        </span>
        <div className="projectile-container">
          <span>Select a Projectile</span>
          <PremadeSelectionsPane premadeSelections={premadeProjectiles} updateMetrics={updateProjectileMetrics} />
          <div className="SummaryPane">
            <div className="data-container"> 
                <span className="data">{simulation.projectile.density} kg m<sup>-3</sup></span>
                <span className="data-type">Density</span>
            </div>
            <div className="data-container">
                <span className="data">.47</span>
                <span className="data-type">Coefficient of Drag</span>
            </div>
            <div className="data-container">
                <span className="data">{simulation.projectile.crossSectionalArea.toFixed(1)} m<sup>2</sup></span>
                <span className="data-type">Cross Sectional Area</span>
            </div>
            <div className="data-container">
                <span className="data">{simulation.projectile.volume.toFixed(1)} m<sup>3</sup></span>
                <span className="data-type">Volume</span>
            </div>
          </div>
        </div>
        <div className="environment-container">
          <span>Select an Environment</span>
          <PremadeSelectionsPane premadeSelections={premadeEnvironments} updateMetrics={updateEnvironmentMetrics} />
          <div className="SummaryPane">
            <div className="data-container">
                <span className="data">{simulation.environment.density} kg m<sup>-3</sup></span>
                <span className="data-type">Atmosphere Density</span>
            </div>
            <div className="data-container">
                <span className="data">{simulation.environment.gravity.toFixed(1)} m/s<sup>2</sup></span>
                <span className="data-type">Gravitational Acceleration</span>
            </div>
          </div>
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
