import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { Projectile } from "../../physics/projectile"
import { Button, IconButton } from "@mui/material"
import { Environment } from "../../physics/environment"

interface EnvironmentSelectionPaneProps {
    premadeEnvironments: Environment[],
    setSelectedEnvironment: (environment: Environment) => void
}

function EnvironmentSelectionPane(props: EnvironmentSelectionPaneProps) {
    let buttonGrid = (
        <Grid2 container spacing={{ xs: 2, md: 3}} columns={{ xs: 4, sm: 8, md: 12}}>
            {props.premadeEnvironments.map((environment, index) => (
                <Grid2 xs={2} sm={4} md={4} key={index}>
                    <Button variant="text" onClick={() => props.setSelectedEnvironment(environment)}>
                        {environment.name}
                    </Button>
                </Grid2>
            ))}
        </Grid2>
    )

    return (
        <div className="EnvironmentSelectionPane pane">
            <span>Select an Environment</span>
            {buttonGrid}
        </div>
    )
}

export default EnvironmentSelectionPane