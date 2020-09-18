import React from 'react'
import TempChart from './TempChart'
import HistoryChart from './HistoryChart'

class Almanac extends React.Component {
    constructor(props) {
        super(props)

        this.outdoorTemps = this.props.data.map(z => {
            return {x: new Date(z.dateutc * 1000), y: z.tempf}
        })

        this.feelsLikeTemps = this.props.data.map(z => {
            return {x: new Date(z.dateutc * 1000), y: z.feelslike}
        })

        this.dewPointTemps = this.props.data.map(z => {
            return {x: new Date(z.dateutc * 1000), y: z.dewpoint}
        })

        this.indoorTemps = this.props.data.map(z => {
            return {x: new Date(z.dateutc * 1000), y: z.tempinf}
        })

        this.indoorFeelsLikeTemps = this.props.data.map(z => {
            return {x: new Date(z.dateutc * 1000), y: z.dewpointin}
        })

        this.outdoorTempData = [{
            label: 'Outdoor',
            data: this.outdoorTemps,
            fill: false,
            borderColor: 'rgb(235,76,66)'
        },
        {
            label: 'Feels Like',
            data: this.feelsLikeTemps,
            fill: false,
            borderColor: 'rgba(235,76,66,.6)',
            borderWidth: 2
        },
        {
            label: 'Dew Point',
            data: this.dewPointTemps,
            fill: false,
            borderColor: 'rgb(66, 235, 161)'
        }]

        this.indoorTempData = [{
            label: 'Indoor',
            data: this.indoorTemps,
            fill: false,
            borderColor: 'rgb(235,76,66)'
        }]
    }

    componentDidMount() {
        

        // this.setState({
        //     tempDataSet: this.tempData
        // })
    }

    render() {
        if(this.outdoorTempData != null) {
            return (
                <div className="almanac-container row">
                    <div className="col-sm-12">
                    <h1 className="section-title col-sm-10 col-sm-offset-1">Temperature</h1>
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1 col-md-5">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h4>24hr Change</h4>
                                    <h3>{parseFloat(this.props.lastDay.tempDiff).toFixed(1)}°</h3>
                                </div>
                                <div className="col-sm-6">
                                    <h4>Daily Avg</h4>
                                    <h3>{parseFloat(this.props.lastDay.avgTemp).toFixed(1)}°</h3>
                                </div>
                                <div className="col-sm-6">
                                    <h4>Daily High</h4>
                                    <h3>{parseFloat(this.props.lastDay.maxTemp).toFixed(1)}°</h3>
                                </div>
                                <div className="col-sm-6">
                                    <h4>Daily Low</h4>
                                    <h3>{parseFloat(this.props.lastDay.minTemp).toFixed(1)}°</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-5">
                            <TempChart title='Outdoor Temperature' data={this.outdoorTempData} />
                        </div>
                    </div>
                    {/* <TempChart title='Indoor Temperature' data={this.indoorTempData} /> */}
                </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default Almanac