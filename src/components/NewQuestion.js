import React, { Component } from 'react'
import { connect } from 'react-redux'

class NewQuestion extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>New Question</h3>
      </div>
    )
  }
}
export default connect()(NewQuestion)