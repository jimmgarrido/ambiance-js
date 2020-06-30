import React from 'react'
import HistoryChart from './HistoryChart'

class TempChart extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('temp')
        console.log(this.props.data)
        return (
            <div className="chart-item col-sm-12 col-md-6 col-lg-5">
                <h4>{this.props.title}</h4>
                <HistoryChart data={this.props.data} />
            </div>
        )
    }
}

export default TempChart