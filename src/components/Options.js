import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleAnswerQuestion } from '../actions/questions'
import { Button, Form, FormGroup, Label, Input, CardBody, CardText, Row, Col } from 'reactstrap';


class Options extends Component {

  state = {
    answer: 'optionOne'
  }

  handleChange = (e) => {
    this.setState({ answer: e.target.value })
  }

  handleSubmit = (e) => {
    
    e.preventDefault()
    const { answer } = this.state
    const { dispatch, id, authedUser } = this.props
    const info = {authedUser, qid: id, answer}
    dispatch(handleAnswerQuestion(info))
  }

  render() {
    const { question } = this.props

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

    const { avatarURL, optionOneText, optionTwoText } = question
    return (
      <CardBody>
        <Row>
        <Col>
        <img src={avatarURL}  alt={`Question Author`}className='photo'/> 
        </Col>
        <Col>
          <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <CardText className="title">Would You Rather?</CardText>
            <FormGroup check>
              <Label check>
                <Input type="radio" id='radio-1' name='myRadio' value="optionOne" checked={this.state.answer === 'optionOne'} onChange={this.handleChange}/>
              {optionOneText}
              </Label>
            </FormGroup>
            <CardText className="title text-primary" >OR</CardText>
            <FormGroup check>
              <Label check>
                <Input type="radio" id='radio-2' name='myRadio' value="optionTwo" checked={this.state.answer === 'optionTwo'} onChange={this.handleChange}/>
                {optionTwoText}
              </Label>
            </FormGroup>
          </FormGroup>
          <Button color="primary" size="lg" block>Submit Answer</Button>
          </Form>
        </Col>
      </Row>
    </CardBody>
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

export default connect(mapStateToProps)(Options)