import React from 'react'
import Chart from 'chart.js'

class HistoryChart extends React.Component {
    constructor(props) {
        super(props)

        Chart.defaults.global.legend.display = false;
        Chart.defaults.global.elements.point.radius = 0;

        this.myChartCanvas = React.createRef()
        // this.test = Array.from(this.props.data)
    }

    componentDidMount() {
        this.outsideTemps = this.props.data.map(z => {
            return {x: new Date(z.dateutc * 1000), y: z.tempf}
        })

        this.dewPoints = this.props.data.map(z => {
            return {x: new Date(z.dateutc * 1000), y: z.dewpoint}
        })

        this.indoorTemps = this.props.data.map(z => {
            return {x: new Date(z.dateutc * 1000), y: z.tempinf}
        })

        console.log(this.outsideTemps)

        //https://www.createwithdata.com/react-chartjs-dashboard/
        var myChart = new Chart(this.myChartCanvas.current, {
            type: 'line',
            data: {
                datasets: [
                    {
                        data: this.outsideTemps,
                        fill: false,
                        borderColor: 'rgb(235,76,66)',
                        borderWidth: 2
                    },
                    {
                        data: this.indoorTemps,
                        fill: false,
                        borderColor: 'rgba(66,235,161)',
                        borderWidth: 2
                    },
                    {
                        data: this.dewPoints,
                        fill: false,
                        borderColor: 'rgba(235,76,66,0.6)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'minute',
                            stepSize: 120
                        }
                    }]
                }
            }
        });
    }

    render() {
        return (
            <div className="row outdoor-details">
                <div className="chart-item">
                    <canvas ref={this.myChartCanvas} height="1001" width="1500"></canvas>
                </div>
            </div>
        )
    }
}

export default HistoryChart;