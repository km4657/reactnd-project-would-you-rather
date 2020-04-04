import React, { Component } from 'react'
import { connect } from 'react-redux'

class Results extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>Results</h3>
      </div>
    )
  }
}
export default connect()(Results)