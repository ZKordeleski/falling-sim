import "./SummaryPane.css"

interface SummaryPaneProps {
    projectileVelocity: number,
    cumulativeTime: number
}

function SummaryPane(props: SummaryPaneProps) {

    return (
        <div className="SummaryPane">
            <span>Velocity: {props.projectileVelocity.toFixed(2)}</span>
            <span> Time: {(props.cumulativeTime / 1000).toFixed(2)}</span>
        </div>
    )
}

export default SummaryPane