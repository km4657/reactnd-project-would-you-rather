import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'


class Poll extends Component {
  render() {
    const { question } = this.props

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

    const { id, avatarURL, hasAnswered } = question

    return (
      <div>
      <Link to={`/question/${id}`} >
      <Card>
      <CardBody>
      <CardTitle>Question is  {id}</CardTitle>
      </CardBody>
      </Card>
      </Link>
      </div>
    )
  }
}

function mapStateToProps({questions, users, authedUser}, {id}) {
  const question = questions[id]

  return {
    authedUser,
    question: question 
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default withRouter(connect(mapStateToProps)(Poll))