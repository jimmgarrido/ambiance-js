import React from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

class HistoryChart extends React.Component {
    constructor(props) {
        super(props)

        Chart.defaults.plugins.legend.display = false;
        Chart.defaults.elements.point.radius = 0;

        this.myChartCanvas = React.createRef()
        // this.test = Array.from(this.props.data)
    }

    componentDidMount() {
        // this.outsideTemps = this.props.data.map(z => {
        //     return {x: new Date(z.dateutc * 1000), y: z.tempf}
        // })

        // this.feelsLikeTemps = this.props.data.map(z => {
        //     return {x: new Date(z.dateutc * 1000), y: z.feelslike}
        // })

        // this.dewPoints = this.props.data.map(z => {
        //     return {x: new Date(z.dateutc * 1000), y: z.dewpoint}
        // })

        // this.indoorTemps = this.props.data.map(z => {
        //     return {x: new Date(z.dateutc * 1000), y: z.tempinf}
        // })

        // this.humidity = this.props.data.map(z => {
        //     return {x: new Date(z.dateutc * 1000), y: z.humidity}
        // })


        //https://www.createwithdata.com/react-chartjs-dashboard/
        var myChart = new Chart(this.myChartCanvas.current, {
            type: 'line',
            data: {
                datasets: this.props.data
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute',
                            stepSize: 120,
                            displayFormats: {
                                minute: 'H:mm'
                            }
                        },
                        gridLines: {
                            display: false
                        }
                    },
                    y: 
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
                        type: 'linear',
                        position: 'right',
                        ticks: {
                            callback: function(value, index, values) {
                                return value + '°'
                            }
                        }
                    }
                },
                legend: {
                    display: true,
                    labels: {
                        boxWidth: 15
                    }
                },
                layout: {
                    padding: 10
                },
                maintainAspectRatio: false
            }
        });
    }

    render() {
        return (
            <div>
                <div className="chart-container">
                    <canvas ref={this.myChartCanvas}></canvas>
                </div>
            </div>
        )
    }
}

export default HistoryChart;