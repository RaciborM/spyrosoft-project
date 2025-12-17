import React, { useEffect } from 'react'
import {getPowerMix} from '../api/power.api'
import {Pie} from 'react-chartjs-2'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PowerDay {
    data: string,
    average: {[fuel: string]: number},
    cleanPerc: number
}

const PowerMixChart: React.FC = () => {
    const [data, setData] = React.useState<PowerDay[]>([])

    useEffect(() => {
        getPowerMix()
        .then(setData)
        .catch(console.error)
    }, [])

    if (!data.length) return <div>Loading...</div>

    const firstThreeDays = data.slice(0, 3)

    return (
        <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
            {firstThreeDays.map((day) => {
                const labels = Object.keys(day.average)
                const values = Object.values(day.average)

                const chartData = {
                    labels,
                    datasets: [{
                        label: 'Power Mix',
                        data: values,
                        backgroundColor: [
                            '#4caf50',
                            '#ff9800',
                            '#2196f3',
                            '#ffeb3b',
                            '#9c27b0',
                            '#f44336',
                            '#00bcd4',
                        ]
                    }]
                }
                const options = {
                    plugins: {
                        legend: {
                            position: 'right' as const,
                        },
                        tooltip: {
                            callbacks: {
                                label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.formattedValue}%`
                            }
                        }
                    }
                }

                const formattedDate = new Date(day.data + 'T00:00:00Z').toLocaleDateString('pl-PL', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                return (
                    <div key={day.data} style={{ width: 300, textAlign: 'center' }}>
                        <h3>{formattedDate}</h3>
                        <p>Clean power: {day.cleanPerc}%</p>
                        <Pie data={chartData} options={options} />
                    </div>
                )
            })}
        </div>
    )
}
export default PowerMixChart;