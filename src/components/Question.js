import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>Question</h3>
      </div>
    )
  }
}
export default connect()(Question)