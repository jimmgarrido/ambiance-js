import React from 'react'

class TempHeader extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
          <div className="col-sm-12 col-md-4">
            <div className="outdoor-temp-grid outdoor-temp">
              <h1>{this.props.data.tempf}°</h1>   
              <h2 id="forecast-high">↑ {parseInt(this.props.forecast.daily.data[0].temperatureHigh)}°</h2>
              <h2 id="forecast-low">↓ {parseInt(this.props.forecast.daily.data[0].temperatureLow)}°</h2>
              <h3 id="indoor-temp">{parseFloat(this.props.data.tempinf).toFixed(1)}° Inside</h3>
            </div>             
          </div>             
        )
    }
}

export default TempHeader