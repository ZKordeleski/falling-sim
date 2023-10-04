import './App.css'
import Simulation from './features/Simulation/SimWindow'
import { Projectile } from './physics/projectile'
import { Environment } from './physics/environment'
// import './features/Simulation/konva'
import ProjectileSelectionWindow from './features/ProjectileSelectionWindow/ProjectileSelectionWindow'
import { useState } from 'react'
import EnvironmentSelectionWindow from './features/EnvironmentSelection/EnvironmentSelectionWindow'

let defaultProjectile = new Projectile("Default", 10, {x:200, y: 200}, 1);
let defaultEnvironment = new Environment(1.225, 9.81, 1, "Earth");
let listOfProjectiles: Projectile[] = [];
let listOfEnvironments: Environment[] = [];
let i = 0;
while (i < 6) {
  listOfProjectiles.push(defaultProjectile);
  listOfEnvironments.push(defaultEnvironment);
  i++;
}

function App() {
  const [selectedProjectile, setSelectedProjectile] = useState(defaultProjectile);
  const [selectedEvironment, setSelectedEnvironment] = useState(defaultEnvironment);
  const ball = new Projectile("Test", 1, {x: 100, y: 0}, .05);
  let environment = new Environment(1.2, 9.81, 1);
  
  return (
    <div className="App">
      <div className="settings-window">
        <ProjectileSelectionWindow premadeProjectiles={listOfProjectiles} setSelectedProjectile={setSelectedProjectile} />
        <EnvironmentSelectionWindow premadeEnvironments={listOfEnvironments} setSelectedEnvironment={setSelectedEnvironment} />
      </div>
      <div className="simulation-window">
        <span>Simulation</span>
      </div>
      <div className="data-window">
        <span>Data Window</span>
      </div>
      {/* <Simulation projectiles={[ball]} environment={environment}/> */}
    </div>
  )
}

export default App
