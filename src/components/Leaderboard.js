import React from 'react'
import { connect } from 'react-redux'
import UserStat from './UserStat'

class Leaderboard extends React.Component {
  render() {
    return (
      <div>
        <h3 className='center'>Leaderboard</h3>
        <ul className='userstat-list'>
          {this.props.userIds.map((id) => (
            <li key={id}>
             <UserStat id={id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({users}) {
  return {
    userIds: Object.keys(users)
      .sort((a,b) => (Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length))
  }
}

export default connect(mapStateToProps)(Leaderboard)