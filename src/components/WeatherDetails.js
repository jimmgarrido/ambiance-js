import React from 'react';

class WeatherDetails extends React.Component {
  constructor(props) {
    super(props);

    this.outsideTemp = this.props.data.tempf;
    // this.prevOutsideTemp = this.props.prevData.tempf;
    // this.tempDiff = Number.parseInt(this.outsideTemp) - Number.parseInt(this.prevOutsideTemp);
  }

  getWindCardinalDir(heading) {
    if((heading >= 337.5 && heading <= 359) || (heading >= 0 && heading < 22.5))
      return 'N'
    else if (heading >= 22.5 && heading < 67.5)
      return 'NE'
    else if (heading >= 67.5 && heading < 112.5)
      return 'E'
    else if (heading >= 112.5 && heading < 157.5)
      return 'SE'
    else if (heading >= 157.5 && heading < 202.5)
      return 'S'
    else if (heading >= 202.5 && heading < 247.5)
      return 'SW'
    else if (heading >= 247.5 && heading < 292.5)
      return 'W'
    else if (heading >= 292.5 && heading < 337.5)
      return 'NW'
  }

  getUVindexRating(index) {
    if (index == 1 || index == 2)
      return 'Low'
    else if (index >= 3 && index <= 5)
      return 'Moderate'
    else if (index == 6 || index == 7)
      return 'High'
    else if (index >= 8 && index <= 10)
      return 'Very High'
    else if (index >= 11)
      return 'Extreme'
    else
      return "None"
  }

  render() {
    return (
    <div>
        <div>
          <div className="wrapper-1">
            <div className="row outdoor-temp">
              <div className="col-sm-12 col-md-7 outdoor-temp-flex">
                <div className="temp-grid">
                  <h1>{this.props.data.tempf}°</h1>   
                  <h2 id="forecast-high">↑ {parseInt(this.props.forecast.daily.data[0].temperatureHigh)}°</h2>
                  <h2 id="forecast-low">↓ {parseInt(this.props.forecast.daily.data[0].temperatureLow)}°</h2>
                </div>             
                <h3>Feels like {parseFloat(this.props.data.feelsLike).toFixed(1)}°</h3>
              </div>             
            </div>
          </div>
          <div className="wrapper-2">
            <div className="row outdoor-details">
              {/* <div className="col-sm-2 glance-items">
                <h2>Glance</h2>
              </div> */}
              <div className="col-sm-6 col-md-5 col-lg-3 glance-item">
                <h4>Humidity</h4>
                <h1>{this.props.data.humidity}%</h1>
                <h4>Dew point</h4>
                <h1>{this.props.data.dewPoint}°</h1>
              </div>
              <div className="col-sm-6 col-md-5 col-lg-3 glance-item">
                <h4>UV Index</h4>
                <h1>{this.props.data.uv} {this.getUVindexRating(this.props.data.uv)}</h1>
              </div>
              <div className="col-sm-6 col-md-5 col-lg-3 glance-item">
                <h4>Wind Speed</h4>
                <h1>{this.props.data.windspeedmph} <span className="minor-label">mph</span> {this.getWindCardinalDir(this.props.data.winddir)}</h1>
                <h4>Gust</h4>
                <h1>{this.props.data.windgustmph} <span className="minor-label">mph</span></h1>
              </div>
            </div>
          </div>
          {/* <div className="wrapper-3">
            <div className="row more-details">
              <div className="col-sm-4 rain-details">
                <h2>Rain</h2>
                <div className="row">
                  <div className="col-sm-4 info-item">
                    <h1>{this.props.data.humidity}%</h1>
                    <h4>Humidity</h4>
                  </div>
                  <div className="col-sm-4 info-item">
                    <h1>{this.props.data.uv} {this.getUVindexRating(this.props.data.uv)}</h1>
                    <h4>UV Index</h4>
                  </div>
                  <div className="col-sm-4 info-item">
                    <h1>{this.props.data.windspeedmph} mph {this.getWindCardinalDir(this.props.data.winddir)}</h1>
                    <h4>Wind</h4>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 rain-details">
                <h2>Rain</h2>
                <div className="row">
                  <div className="col-sm-4 info-item">
                    <h1>{this.props.data.humidity}%</h1>
                    <h4>Humidity</h4>
                  </div>
                  <div className="col-sm-4 info-item">
                    <h1>{this.props.data.uv} {this.getUVindexRating(this.props.data.uv)}</h1>
                    <h4>UV Index</h4>
                  </div>
                  <div className="col-sm-4 info-item">
                    <h1>{this.props.data.windspeedmph} mph {this.getWindCardinalDir(this.props.data.winddir)}</h1>
                    <h4>Wind</h4>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 rain-details">
                <h2>Rain</h2>
                <div className="row">
                  <div className="col-sm-4 info-item">
                    <h1>{this.props.data.humidity}%</h1>
                    <h4>Humidity</h4>
                  </div>
                  <div className="col-sm-4 info-item">
                    <h1>{this.props.data.uv} {this.getUVindexRating(this.props.data.uv)}</h1>
                    <h4>UV Index</h4>
                  </div>
                  <div className="col-sm-4 info-item">
                    <h1>{this.props.data.windspeedmph} mph {this.getWindCardinalDir(this.props.data.winddir)}</h1>
                    <h4>Wind</h4>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 rain-details">
                <h2>Rain</h2>
                <div className="row">
                  <div className="col-sm-4 info-item">
                    <h1>{this.props.data.humidity}%</h1>
                    <h4>Humidity</h4>
                  </div>
                  <div className="col-sm-4 info-item">
                    <h1>{this.props.data.uv} {this.getUVindexRating(this.props.data.uv)}</h1>
                    <h4>UV Index</h4>
                  </div>
                  <div className="col-sm-4 info-item">
                    <h1>{this.props.data.windspeedmph} mph {this.getWindCardinalDir(this.props.data.winddir)}</h1>
                    <h4>Wind</h4>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 rain-details">
                <h2>Rain</h2>
                <div className="row">
                  <div className="col-sm-4 info-item">
                    <h1>{this.props.data.humidity}%</h1>
                    <h4>Humidity</h4>
                  </div>
                  <div className="col-sm-4 info-item">
                    <h1>{this.props.data.uv} {this.getUVindexRating(this.props.data.uv)}</h1>
                    <h4>UV Index</h4>
                  </div>
                  <div className="col-sm-4 info-item">
                    <h1>{this.props.data.windspeedmph} mph {this.getWindCardinalDir(this.props.data.winddir)}</h1>
                    <h4>Wind</h4>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div> 
        {/* <div className="row">
          <div className="col-md-2 col-md-offset-4">
            <h2>{this.props.data.feelsLike}</h2>
            <h3>Feels like</h3>
          </div>
          <div className="col-md-2">
            <h2>{this.props.data.dewPoint}</h2>
            <h3>Dew point</h3>
          </div>
        </div> */}
        {/* <div className="row outdoor-details">
          <div className="col-md-2">
            <h1>{this.props.data.humidity}%</h1>
            <h3>Humidity</h3>
          </div>
          <div className="col-md-2">
            <h1>{this.props.data.uv} {this.getUVindexRating(this.props.data.uv)}</h1>
            <h3>UV Index</h3>
          </div>
          <div className="col-md-2">
            <h1>{this.props.data.windspeedmph} mph {this.getWindCardinalDir(this.props.data.winddir)}</h1>
            <h3>Wind</h3>
          </div>
        </div> */}
      {/* <div>
        <h3 className="header">Inside</h3>
        <div className="row outdoor-temp">
          <div className="col-md-3 col-md-offset-3">
            <h1>{this.props.data.tempinf}°</h1>
            <h3>Inside</h3>
          </div>
        </div>
      </div> */}
    </div>
    );
  }
}

export default WeatherDetails;