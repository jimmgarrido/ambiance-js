import React from 'react'

class TempHeader extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
              <div className="wrapper-1">
                <div className="row outdoor-temp">
                  <div className="col-sm-12 col-md-7 outdoor-temp-flex">
                    <div className="temp-grid">
                      <h1>{this.props.data.tempf}°</h1>   
                      <h2 id="forecast-high">↑ {parseInt(this.props.forecast.daily.data[0].temperatureHigh)}°</h2>
                      <h2 id="forecast-low">↓ {parseInt(this.props.forecast.daily.data[0].temperatureLow)}°</h2>
                    </div>             
                    <h3>{parseFloat(this.props.data.tempinf).toFixed(1)}° Inside</h3>
                  </div>             
                </div>
              </div>
            </div>
        )
    }
}

export default TempHeader