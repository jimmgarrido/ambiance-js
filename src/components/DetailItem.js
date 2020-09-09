import React from 'react'

class DetailItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="col-sm-6 col-md-3 glance-item">
                {/* <h4>{this.props.label}</h4> */}
                <h4>{this.props.label}</h4> 
                <h1>{this.props.data}</h1>
            </div>
        )
    }
}

export default DetailItem