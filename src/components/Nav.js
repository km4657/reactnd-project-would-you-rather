import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {

  handleClick = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(setAuthedUser(null))
  }

  render() {
    
    const { user } = this.props
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/homepage' activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              Add Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
             Leaderboard
            </NavLink>
          </li>
          <li>
            <Link to='/' activeClassName='active' onClick={this.handleClick}>
             Logout
            </Link>
          </li>
          <li>
            <img
              src={user.avatarURL}
              alt={`Avatar of ${user.name}`}
              className='avatar'
            />
          </li>
        </ul>
      </nav>
    )
  }
} 

function mapStateToProps({authedUser, users}) {
  return {
    user: users[authedUser]
  }
}

export default connect(mapStateToProps)(Nav)