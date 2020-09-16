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
                <div className="almanac-container">
                    <h1>Details</h1>
                    <div>
                        <h2>Temperature</h2>
                        <div className="row">
                            <div className="col-sm-2">
                                <h4>24hr Change</h4>
                                <h3>-8.7°</h3>
                            </div>
                            <div className="col-sm-2">
                                <h4>Highest Temp</h4>
                                <h3>108.7°</h3>
                            </div>
                            <div className="col-sm-2">
                                <h4>Lowest Temp</h4>
                                <h3>68.7°</h3>
                            </div>
                            <div className="col-sm-6">
                            <TempChart title='Outdoor Temperature' data={this.outdoorTempData} />
                            </div>
                        </div>
                    </div>
                    <TempChart title='Indoor Temperature' data={this.indoorTempData} />
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default Almanac