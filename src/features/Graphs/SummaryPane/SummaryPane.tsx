import "./SummaryPane.css"

interface SummaryPaneProps {
    projectileVelocity: number,
    cumulativeTime: number
}

function SummaryPane(props: SummaryPaneProps) {

    return (
        <div className="SummaryPane">
            <div className="data-container">
                <span className="data">{props.projectileVelocity.toFixed(1)} m/s</span>
                <span className="data-type">Velocity</span>
            </div>
            <div className="data-container">
                <span className="data">{(props.cumulativeTime / 1000).toFixed(1)} s</span>
                <span className="data-type">Time</span>
            </div>
        </div>
    )
}

export default SummaryPane