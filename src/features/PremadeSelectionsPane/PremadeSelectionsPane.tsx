import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import "./PremadeSelectionsPane.css";

// TODO: Don't need premadeProjectiles passed in. Is global now.
interface PremadeSelectionsPaneProps<T> {
    premadeSelections: T[],
    updateMetrics: (metrics: T) => void
}

// TODO: Fix setSimulation to adjust projectile parameters of mass, density, volume, radius BUT NOT position, velocity, accel.

function PremadeSelectionsPane<T extends {name: string, icon: string}>(props: PremadeSelectionsPaneProps<T>) {
    const [selectedPremade, setSelectedPremade] = useState(props.premadeSelections[0]);
    
    let toggleButtonGroup = (
        <ToggleButtonGroup 
            className="toggle-button-group"
            value={selectedPremade}
            exclusive
            onChange={(_event, newPremade) => {
                setSelectedPremade(newPremade);
                props.updateMetrics(newPremade);
            }}
        >
            {props.premadeSelections.map((item, index) => (
                <ToggleButton key={index} value={item} aria-label={item.name}>
                    <img src={item.icon}/>
                    <span>{item.name}</span>
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    )

    return (
        <div className="PremadeSelectionsPane pane">
            {toggleButtonGroup}
        </div>
    )
}

export default PremadeSelectionsPane