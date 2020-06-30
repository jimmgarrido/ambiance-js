import React from 'react'
import WeatherDetails from './components/WeatherDetails'
import Almanac from './components/Almanac'
import TempHeader from './components/TempHeader'
import './css/mini-default.css'
import './css/App.scss'
import HistoryChart from './components/HistoryChart'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherData : null,
      forecastData: null,
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
    fetch('/api')
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      this.setState({
        weatherData: data.weatherData[0].lastData,
        forecastData: data.forecastData
      })
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
      })
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
              <WeatherDetails data={this.state.weatherData} />
            </div>
            <Almanac data={this.state.historicalData} />
          </div>
        </div>
      );
    }
  }
}

export default App;
