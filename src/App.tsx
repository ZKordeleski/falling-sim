import './App.css'
import { Projectile, premadeProjectiles } from './physics/projectile'
import { Environment, premadeEnvironments } from './physics/environment'
// import './features/Simulation/konva'
import ProjectileSelectionWindow from './features/ProjectileSelectionWindow/ProjectileSelectionWindow'
import { useState } from 'react'
import EnvironmentSelectionWindow from './features/EnvironmentSelection/EnvironmentSelectionWindow'
import SimulationWindow from './features/Simulation/SimulationWindow'

// let defaultProjectile = new Projectile("Default", 10, {x:200, y: 200}, 1);
// let defaultEnvironment = new Environment(1.225, 9.81, 1, "Earth");
// let listOfProjectiles: Projectile[] = [];
// let listOfEnvironments: Environment[] = [];
// let i = 0;
// while (i < 6) {
//   listOfProjectiles.push(defaultProjectile);
//   listOfEnvironments.push(defaultEnvironment);
//   i++;
// }

function App() {
  const [selectedProjectile, setSelectedProjectile] = useState(premadeProjectiles[0]);
  const [selectedEvironment, setSelectedEnvironment] = useState(premadeEnvironments[0]);
  
  return (
    <div className="App">
      <div className="settings-window">
        <ProjectileSelectionWindow premadeProjectiles={premadeProjectiles} setSelectedProjectile={setSelectedProjectile} />
        <EnvironmentSelectionWindow premadeEnvironments={premadeEnvironments} setSelectedEnvironment={setSelectedEnvironment} />
      </div>
      <div className="simulation-window">
        <SimulationWindow projectile={selectedProjectile} environment={selectedEvironment} />
      </div>
      <div className="data-window">
        <span>Data Window</span>
      </div>
    </div>
  )
}

export default App
