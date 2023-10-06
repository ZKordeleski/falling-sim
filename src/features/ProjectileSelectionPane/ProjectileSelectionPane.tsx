import { Button } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { PremadeProjectile } from "../../physics/projectile"

// TODO: Don't need premadeProjectiles passed in. Is global now.
interface ProjectileSelectionPaneProps {
    premadeProjectiles: PremadeProjectile[],
    updateProjectileMetrics: (metrics: PremadeProjectile) => void
}

// TODO: Fix setSimulation to adjust projectile parameters of mass, density, volume, radius BUT NOT position, velocity, accel.

function ProjectileSelectionPane(props: ProjectileSelectionPaneProps) {
    let buttonGrid = (
        <Grid2 container spacing={{ xs: 2, md: 3}} columns={{ xs: 4, sm: 8, md: 12}}>
            {props.premadeProjectiles.map((projectile, index) => (
                <Grid2 xs={2} sm={4} md={4} key={index}>
                    <Button variant="text" onClick={() => props.updateProjectileMetrics(projectile)}>
                        {projectile.name}
                    </Button>
                </Grid2>
            ))}
        </Grid2>
    )

    return (
        <div className="ProjectileSelectionPane pane">
            <span>Select a Projectile</span>
            {buttonGrid}
        </div>
    )
}

export default ProjectileSelectionPane
