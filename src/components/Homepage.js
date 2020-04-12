import React from 'react';
import { connect } from 'react-redux'
import {Tabs, Tab} from 'react-bootstrap';
import Poll from './Poll'

class Homepage extends React.Component {
  
  render() {
    return (
      <div>
      <Tabs defaultActiveKey="options">
        <Tab eventKey="options" title="Unanswered">
          <ul>
          {this.props.unansweredIds.map((id) => (
            <li key={id}>
             <Poll id={id} answered='false'/>
            </li>
          ))}
          </ul>
        </Tab>
        <Tab eventKey="results" title="Answered">
          <ul>
          {this.props.answeredIds.map((id) => (
            <li key={id}>
             <Poll id={id} answered='true'/>
            </li>
          ))}
          </ul>
        </Tab>
      </Tabs>
      </div>
    )
  }
}

function mapStateToProps({authedUser, questions}) {

  const answeredIds = []
  const unansweredIds = []
  const ids = Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp);
  
  for (const id of ids) {
    if (questions[id].optionOne.votes.includes(authedUser) || questions[id].optionTwo.votes.includes(authedUser)) {
      answeredIds.push(id)
    }
    else {
      unansweredIds.push(id)
    }
  }

  return {
    authedUser,
    unansweredIds,
    answeredIds
  }
}

export default connect(mapStateToProps)(Homepage)