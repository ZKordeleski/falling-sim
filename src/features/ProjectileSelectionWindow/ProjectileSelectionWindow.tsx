import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { PremadeProjectile, Projectile } from "../../physics/projectile"
import { Button, IconButton } from "@mui/material"
import { Simulation } from "../../App"

interface ProjectileSelectionWindowProps {
    premadeProjectiles: PremadeProjectile[],
    simulation: Simulation,
    setSimulation: (Simulation: Simulation) => void
}

// TODO: Fix setSimulation to adjust projectile parameters of mass, density, volume, radius BUT NOT position, velocity, accel.

function ProjectileSelectionWindow(props: ProjectileSelectionWindowProps) {
    let buttonGrid = (
        <Grid2 container spacing={{ xs: 2, md: 3}} columns={{ xs: 4, sm: 8, md: 12}}>
            {props.premadeProjectiles.map((projectile, index) => (
                <Grid2 xs={2} sm={4} md={4} key={index}>
                    <Button variant="text" onClick={() => props.setSimulation(props.simulation)}>
                        {projectile.name}
                    </Button>
                </Grid2>
            ))}
        </Grid2>
    )

    return (
        <div>
            <span>Select a Projectile</span>
            {buttonGrid}
        </div>
    )
}

export default ProjectileSelectionWindow
