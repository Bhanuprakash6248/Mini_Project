import {Component} from 'react'
import Cookie from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {MdClose} from 'react-icons/md'

import './index.css'

class Header extends Component {
  state = {isMenu: false, head: true, report: false}

  logoutBtnClicked = () => {
    console.log(this.props)
    const {history} = this.props
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  iconClicked = () => {
    this.setState(prev => ({isMenu: !prev.isMenu}))
  }

  reportClicked = () => {
    this.setState({report: true, head: false})
  }

  textClicked = () => {
    this.setState({head: true, report: false})
  }

  render() {
    const {isMenu, report, head} = this.state
    const reportClassName = report ? 'activeText' : ''
    const headClassName = head ? 'activeText' : ''

    return (
      <>
        <nav className="nav-bg">
          <h1 className="nav-heading">Daily Mood Tracker</h1>
          <div className="nav-info">
            <ul className="navbar-ul-list">
              <Link to="/" className="nav-home" onClick={this.textClicked}>
                <li className={`header-listItem ${headClassName}`}>Home</li>
              </Link>
              <Link
                to="/reports"
                className="nav-reports"
                onClick={this.reportClicked}
              >
                <li className={`header-listItem ${reportClassName}`}>
                  Reports
                </li>
              </Link>

              <li>
                <button
                  type="button"
                  className="logout-btn"
                  onClick={this.logoutBtnClicked}
                >
                  Logout
                </button>
              </li>
            </ul>
            {isMenu ? (
              <MdClose className="close-icon" onClick={this.iconClicked} />
            ) : (
              <img
                src="https://res.cloudinary.com/dt49os8gz/image/upload/v1717092895/x0blm7duwthn8kpsa9nt.png"
                alt=""
                className="hamburgerBtn"
                onClick={this.iconClicked}
              />
            )}
          </div>
        </nav>
        {isMenu ? (
          <div className="nav-small">
            <ul className="navbar-small-info">
              <Link to="/" className="nav-home">
                <li className="header-listItem ">Home</li>
              </Link>
              <Link to="/reports" className="nav-reports">
                <li className="header-listItem ">Reports</li>
              </Link>
              <li>
                <button
                  type="button"
                  className="logout-btn"
                  onClick={this.logoutBtnClicked}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </>
    )
  }
}
export default withRouter(Header)
