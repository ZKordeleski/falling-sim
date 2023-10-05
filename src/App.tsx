import './App.css'
import { PremadeProjectile, Projectile, premadeProjectiles } from './physics/projectile'
import { Environment, premadeEnvironments } from './physics/environment'
// import './features/Simulation/konva'
import ProjectileSelectionWindow from './features/ProjectileSelectionWindow/ProjectileSelectionWindow'
import { useState } from 'react'
import EnvironmentSelectionWindow from './features/EnvironmentSelection/EnvironmentSelectionWindow'
import SimulationWindow from './features/Simulation/SimulationWindow'

export interface Simulation {
  isPlaying: boolean,
  projectile: Projectile,
  environment: Environment
}

let defaultSimulation: Simulation = {
  isPlaying: false,
  projectile: new Projectile(premadeProjectiles[1].name, premadeProjectiles[1].density, premadeProjectiles[1].radius),
  environment: new Environment(premadeEnvironments[0].density, premadeEnvironments[0].gravity, premadeEnvironments[0].name)

}

function App() {
  // TODO: Current issue is we want to link the preset selections to building a new projectile. As it stands, only the INITIAL state of the simulation is connected
  // to the selection process. To fix this, we probably need a combined state for all of this or something similar. What a mess.
  const [simulation, setSimulation] = useState(defaultSimulation);

  function updateProjectileMetrics(metrics: PremadeProjectile) {
    let updatedSimulation = {...simulation};
    updatedSimulation.projectile.updateMetrics(metrics);
    setSimulation(updatedSimulation);
    console.log(simulation);
  }

  const startSimulation = () => setSimulation((prev) => ({...prev, isPlaying: true}));
  const pauseSimulation = () => setSimulation((prev) => ({...prev, isPlaying: false}));
  // const resetSimulation = () => setSimulation((prev) => ({...prev, isPlaying: false, projectile: new Projectile(selectedProjectile.name, selectedProjectile.density, selectedProjectile.position, selectedProjectile.radius)}));
  
  return (
    <div className="App">
      <div className="settings-window">
        <div className="simulation-buttons">
          <button onClick={startSimulation}>Play</button>
          <button onClick={pauseSimulation}>Pause</button>
          {/* <button onClick={resetSimulation}>Reset</button> */}
        </div>
        <ProjectileSelectionWindow premadeProjectiles={premadeProjectiles} updateProjectileMetrics={updateProjectileMetrics} />
        {/* <EnvironmentSelectionWindow premadeEnvironments={premadeEnvironments} setSimulation={setSimulation} /> */}
      </div>
      <div className="simulation-window">
        <SimulationWindow simulation={simulation} setSimulation={setSimulation} />
      </div>
      <div className="data-window">
        <span>Data Window</span>
      </div>
    </div>
  )
}

export default App
