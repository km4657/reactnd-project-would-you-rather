import React, { Component } from 'react'
import { connect } from 'react-redux'

class SignIn extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>SignIn</h3>
      </div>
    )
  }
}
export default connect()(SignIn)