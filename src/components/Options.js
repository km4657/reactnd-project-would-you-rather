import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Options extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>Options</h3>
      </div>
    )
  }
}
export default connect()(Options)