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

        this.feelsLikeTemps = this.props.data.map(z => {
            return {x: new Date(z.dateutc * 1000), y: z.feelslike}
        })

        this.dewPoints = this.props.data.map(z => {
            return {x: new Date(z.dateutc * 1000), y: z.dewpoint}
        })

        this.indoorTemps = this.props.data.map(z => {
            return {x: new Date(z.dateutc * 1000), y: z.tempinf}
        })

        this.humidity = this.props.data.map(z => {
            return {x: new Date(z.dateutc * 1000), y: z.humidity}
        })

        //https://www.createwithdata.com/react-chartjs-dashboard/
        var myChart = new Chart(this.myChartCanvas.current, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Outdoor',
                        data: this.outsideTemps,
                        fill: false,
                        borderColor: 'rgb(235,76,66)',
                        // borderWidth: 2,
                        yAxisID: 'temp-axis'
                    },
                    {
                        label: 'Feels Like',
                        data: this.feelsLikeTemps,
                        fill: false,
                        borderColor: 'rgba(235,76,66,.6)',
                        borderWidth: 2,
                        yAxisID: 'temp-axis'
                    },
                    // {
                    //     label: 'Humidity',
                    //     data: this.humidity,
                    //     fill: false,
                    //     borderColor: 'rgba(43,127,233,.7)',
                    //     borderWidth: 2,
                    //     borderDash: [5,2],
                    //     yAxisID: 'humidity-axis'
                    // }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'minute',
                            stepSize: 120,
                            displayFormats: {
                                minute: 'H:mm'
                            }
                        }
                    }],
                    yAxes: [
                    //     {
                    //     id: 'humidity-axis',
                    //     type: 'linear',
                    //     position: 'left',
                    //     scaleLabel: {
                    //         display: true,
                    //         labelString: 'Humidity'
                    //     },
                    //     ticks: {
                    //         max: 100,
                    //         min: 0,
                    //         callback: function(value, index, values) {
                    //             return value + '%'
                    //         }
                    //     },
                    //     gridLines: {
                    //         drawOnChartArea: false
                    //     }
                    // }, 
                    {
                        id: 'temp-axis',
                        type: 'linear',
                        position: 'right',
                        ticks: {
                            callback: function(value, index, values) {
                                return value + '°'
                            }
                        }
                    }]
                },
                legend: {
                    display: true
                },
                // responsive: true
            }
        });
    }

    render() {
        return (
            <div className="chart-item col-sm-3 col-md-5">
                <h4>{this.props.title}</h4>
                <canvas ref={this.myChartCanvas}></canvas>
            </div>
        )
    }
}

export default HistoryChart;