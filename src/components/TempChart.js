import React from 'react'
import HistoryChart from './HistoryChart.js'

class TempChart extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('temp')
        console.log(this.props.data)
        return (
            <div className="chart-item">
                {/* <h4>{this.props.title}</h4> */}
                <HistoryChart data={this.props.data} />
            </div>
        )
    }
}

export default TempChart