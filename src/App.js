import React from 'react'
import WeatherDetails from './components/WeatherDetails.js'
import Almanac from './components/Almanac.js'
import TempHeader from './components/TempHeader.js'
import './css/mini-default.css'
import './css/App.scss'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherData : null,
      forecastData: null,
      lastDayData : null,
      historicalData : null
    }
    this.refreshCount = 0
  }

  componentDidMount() {
    this.getData()
    this.getHistoryData()

    this.refreshTimer = setInterval(
      () => this.getData(),
      60000
      );
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer)
  }

  getData() {
    fetch('/api/current')
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      this.setState({
        weatherData : data.weatherData[0].lastData,
        forecastData : data.forecastData,
        lastDayData : data.lastDay
      });
    })
  }

  getHistoryData() {
    fetch('/api/history')
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      this.setState({
        historicalData: data.data
      });
      console.log("TEST");
      console.log(this.state.historicalData);
    })
  }

  render() {
    if(this.state.weatherData == null || this.state.historicalData == null) {
      return <p>Loading data...</p>
    } else {
      return (
        <div className="App">
          <div className="app-grid">
            <div className="row header">
              <TempHeader data={this.state.weatherData} forecast={this.state.forecastData.data} />
            </div>
            <WeatherDetails data={this.state.weatherData} />
            <Almanac weatherData={this.state.weatherData} lastDay={this.state.lastDayData} data={this.state.historicalData} />
          </div>
        </div>
      );
    }
  }
}

export default App;
