import "./ChartsPane.css"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
import { memo } from "react";
import { Chart, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

interface ChartPaneProps {
    timeData: number[],
    metricData: number[],
    title: string
}

ChartJS.defaults.color = "#eeeeee";
ChartJS.defaults.borderColor = "#101010";

function ChartPaneRaw(props: ChartPaneProps) {
    
    const data = {
        datasets: [
          {
            label: props.title,
            data: props.metricData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
        labels: props.timeData
      };

    return (
        <div className="ChartPane">
            <Line className="line-chart" options={
                {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top' as const,
                            display: false
                        },
                        title: {
                            display: true,
                            text: props.title,
                        },
                    },
                    scales: {
                        x: {
                            min: 0,
                            max: Math.max(props.timeData[props.timeData.length - 1], 10),
                            ticks: {
                                callback: (time) => (+time/1000).toFixed(1)
                            },
                            type: 'linear'
                        },
                    },
                    animation: false
                }
            } data={data} />
        </div>
    )
}

function arePropsEqual(oldProps: ChartPaneProps, newProps: ChartPaneProps) {
    // NOTE: This is a simple hack sinse we are only ever appending the arrays or resetting them completely.
    // ----- Any changes to the data logging process could require updating this memoization.
    return (oldProps.timeData.length === newProps.timeData.length);
}

const ChartPane = memo(ChartPaneRaw, arePropsEqual);

export default ChartPane