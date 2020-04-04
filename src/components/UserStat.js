import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserStat extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>UserStat</h3>
      </div>
    )
  }
}
export default connect()(UserStat)