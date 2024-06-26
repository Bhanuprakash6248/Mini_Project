import {Component} from 'react'
import './index.css'
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md'

class Calender extends Component {
  state = {month: 1}

  incrementRightBtn = () => {
    const {month} = this.state
    if (month < 12) {
      this.setState(prev => ({month: prev.month + 1}), this.onMonthChange)
    }
  }

  onMonthChange = () => {
    console.log('in onMonthChange')
    const {onChangeMonth} = this.props
    const {month} = this.state
    onChangeMonth(month)
  }

  decrementleftBtn = () => {
    const {month} = this.state
    if (month > 1) {
      this.setState(prev => ({month: prev.month - 1}), this.onMonthChange)
    }
  }

  render() {
    const {calenderList, onDateOfCalender} = this.props
    const {month} = this.state
    return (
      <>
        <div className="calender-header">
          <button
            type="button"
            className="arrow-btn"
            aria-label="Previous"
            onClick={this.decrementleftBtn}
          >
            <MdOutlineKeyboardArrowLeft className="arrow-icon" />
          </button>
          <p className="calender-month">{calenderList[month - 1].monthName}</p>
          <button
            type="button"
            className="arrow-btn"
            aria-label="Previous"
            onClick={this.incrementRightBtn}
          >
            <MdOutlineKeyboardArrowRight className="arrow-icon" />
          </button>
        </div>
        <div className="calender-days">
          <ul className="calender-ul-con">
            <li className="calender-day">Su</li>
            <li className="calender-day">Mo</li>
            <li className="calender-day">Tu</li>
            <li className="calender-day">We</li>
            <li className="calender-day">Th</li>
            <li className="calender-day">Fr</li>
            <li className="calender-day">Sa</li>
          </ul>
          <ul className="dates-con">
            {calenderList[month - 1].dates.map(each => {
              const {id, date, emojiUrl, emojiName} = each
              const dateClicked = () => {
                onDateOfCalender(id, month)
              }
              return (
                <li key={id} className="date-listItem">
                  <button
                    type="button"
                    className="date-btn"
                    aria-label="Previous"
                    onClick={dateClicked}
                  >
                    <p className="date">{date}</p>
                    {}
                    <img
                      src={emojiUrl}
                      alt={emojiName}
                      className="date-emoji"
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </>
    )
  }
}

export default Calender
