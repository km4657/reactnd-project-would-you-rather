import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Card, CardBody, CardTitle, CardText, Row, Col, Button} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'


class Poll extends Component {
  render() {
    const { question } = this.props

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

    const { id, name, avatarURL } = question
    const answered = this.props.answered

    return (
        <Card>
          <CardBody>
              <div>
              <Row>
              <Col>
              <img src={avatarURL} className='photo'/> 
              </Col>
              <Col>
              <CardTitle>
                {name} asks: 
              </CardTitle>
              {this.props.answered === 'true' ?
                <div>
                  <Link to={`/question/${id}`} >
                    <Button color="primary" size="lg" block>See Results</Button>
                  </Link>
                </div>
              : <div>
                  <Link to={`/question/${id}`} >
                    <Button color="primary" size="lg" block>Answer Question</Button>
                  </Link>
                </div>
            }
              </Col>
              </Row>
              </div>
          </CardBody>
        </Card>
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