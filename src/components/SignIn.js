import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class SignIn extends Component {

  state = {
    username: '',
    toHomepage: false
  }

  handleChange = (e) => {
    const username = e.target.value
    this.setState(() => ({
      username
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { username } = this.state
    
    const { dispatch } = this.props
   
    dispatch(setAuthedUser(username))
    
    this.setState(() => ({
      username: '',
      toHomepage: true
    }))
  }

  render() {

    const { username, toHomepage } = this.state

    if (toHomepage === true) {
      return <Redirect to='/homepage' />
    }

    return (
      <div>
        <h3 className='center'>SignIn</h3>
        <form onSubmit={this.handleSubmit}>
        <label>
          Pick your username:
          <select value={username} onChange={this.handleChange}>
            {this.props.userIds.map((id) => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </label>
        <button
            className='btn'
            type='submit'
            disabled={username === ''}>
              Submit
        </button>
      </form>
      </div>
    )
  }
}

function mapStateToProps({users}) {
  return {
    userIds: Object.keys(users)
      .sort((a,b) => users[b].id - users[a].id)
  }
}
export default connect(mapStateToProps)(SignIn)