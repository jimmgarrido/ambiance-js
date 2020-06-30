import React from 'react'
import WeatherDetails from './components/WeatherDetails'
import HistoryChart from './components/HistoryChart'
import TempHeader from './components/TempHeader'
import './css/mini-default.css'
import './css/App.scss'

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
    if(this.state.weatherData == null) {
      return <p>Loading data...</p>
    } else {
      return (
        <div className="App">
          <div className="container app-grid">
            <div className="row header">
              <TempHeader data={this.state.weatherData} forecast={this.state.forecastData.data} />
              <WeatherDetails data={this.state.weatherData} />
            </div>
            <div className="detail-wrapper">
              <div className="row chart-wrapper">
              <HistoryChart title={'Outdoor Temperature'} data={this.state.historicalData} />
              <HistoryChart title={'Humidity'} data={this.state.historicalData} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
