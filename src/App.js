import React from 'react';
import WeatherDetails from './components/WeatherDetails';
import DateHeader from './components/DateHeader'
import './css/mini-default.css';
import './css/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherData : null,
      forecastData: null
    }
    this.refreshCount = 0
  }

  componentDidMount() {
    this.getData()
    // this.refreshTimer = setInterval(
    //   () => this.getData(),
    //   60000
    //   );
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer)
  }

  getData() {
    fetch('http://localhost:4000/api')
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)
      this.setState({
        weatherData: data.weatherData[0],
        forecastData: data.forecastData 
      })
    })
  }

  render() {
    if(this.state.weatherData == null) {
      return <p>Loading data...</p>
    } else {
      return (
        <div className="App">
          <div className="container">
            <main>
              <WeatherDetails data={this.state.weatherData.lastData} prevData={this.state.weatherData.previousData} forecast={this.state.forecastData.data} />
            </main>
          </div>
        </div>
      );
    }
  }
}

export default App;
