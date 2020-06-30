import React from 'react'
import DetailItem from './DetailItem';

class WeatherDetails extends React.Component {
  constructor(props) {
    super(props)

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
      <div className="col-sm-12 col-lg-7 col-lg-offset-1">
        <div className="row item-box">
          <DetailItem label='Humidity' data={this.props.data.humidity + '%'} />
          <DetailItem label='Dew Point' data={parseFloat(this.props.data.dewPoint).toFixed(1) + '°'} />
          <DetailItem label='Feels Like' data={parseFloat(this.props.data.feelsLike).toFixed(1) + '°'} />
          <DetailItem label='UV Index' data={this.props.data.uv + ' ' + this.getUVindexRating(this.props.data.uv)} />
          <DetailItem label='Wind Speed' data={this.props.data.windspeedmph + 'mph' + ' ' + this.getWindCardinalDir(this.props.data.winddir)} />
          <DetailItem label='Gust' data={this.props.data.windgustmph + 'mph' + ' ' + this.getWindCardinalDir(this.props.data.winddir)} />
        </div>
      </div>
    );
  }
}

export default WeatherDetails