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
import { Line } from 'react-chartjs-2';

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

function ChartPane(props: ChartPaneProps) {
    
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
            <div>This is a chart!</div>
            <Line options={
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
                            type: 'linear'
                        }
                    },
                    animation: false
                }
            } data={data} />
        </div>
    )
}

export default ChartPane