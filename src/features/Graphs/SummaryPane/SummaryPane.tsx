import "./SummaryPane.css"

interface SummaryPaneProps {
    projectileVelocity: number,
    cumulativeTime: number
}

function SummaryPane(props: SummaryPaneProps) {

    return (
        <div className="SummaryPane">
            <span>Velocity: {props.projectileVelocity}</span>
            <span> Time: {props.cumulativeTime}</span>
        </div>
    )
}

export default SummaryPane