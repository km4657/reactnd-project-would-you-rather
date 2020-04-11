import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import Results from './Results'
import Options from './Options'
import { Card } from 'reactstrap';


class Question extends Component {
  render() {
    const { question } = this.props

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

    const { id, hasAnswered } = question

    return (
      <div>
      <Card>
      {hasAnswered === true
                ? <Results id={id} />
                : <Options id={id}/>}
      </Card>
      </div>
    )
  }
}

function mapStateToProps({questions, users, authedUser}, props) {
  const { id } = props.match.params
  const question = questions[id]

  return {
    authedUser,
    question: question 
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default connect(mapStateToProps)(Question)