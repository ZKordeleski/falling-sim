import './App.css'
import Simulation from './features/Simulation/SimWindow'
import { Projectile } from './physics/projectile'
import { Environment } from './physics/environment'
import './features/Simulation/konva'

function App() {
  const ball = new Projectile("Test", 1, {x: 100, y: 0}, .05);
  let environment = new Environment(1.2, 9.81, 1);
  
  return (
    <div className="App">
      <Simulation projectiles={[ball]} environment={environment}/>
    </div>
  )
}

export default App
