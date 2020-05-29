import React from 'react'

class DateHeader extends React.Component {
    constructor(props) {
        super(props)
        
        this.currentDate = new Date()
        this.weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday']
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }

    getDayOfWeek() {
        return this.weekDays[this.currentDate.getDay()]
    }

    getMonthAndDate() {
        return this.months[this.currentDate.getMonth()] + ', ' + this.currentDate.getDate();
    }

    render() {
        return (
            <div className="row">
                <div className="Date-header">
                    <h1>{this.props.name}</h1>
                </div>
            </div>
        )
    }
}

export default DateHeader;