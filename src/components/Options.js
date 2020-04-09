import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleAnswerQuestion } from '../actions/questions'
import { Button, Form, FormGroup, Label, Input, CardBody, CardTitle } from 'reactstrap';


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
    this.setState(() => ({
      answer: 'optionOne'
    }))
  }

  render() {
    const { question } = this.props

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

    const { name, optionOneText, optionTwoText } = question
    return (
      <CardBody>
      <CardTitle>{name} Asks: </CardTitle>
      <Form onSubmit={this.handleSubmit}>
      <FormGroup>
        <legend>Would You Rather?</legend>
        <FormGroup check>
          <Label check>
            <Input type="radio" id='radio-1' name='myRadio' value="optionOne" checked={this.state.answer === 'optionOne'} onChange={this.handleChange}/>
          {optionOneText}
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" id='radio-2' name='myRadio' value="optionTwo" checked={this.state.answer === 'optionTwo'} onChange={this.handleChange}/>
            {optionTwoText}
          </Label>
        </FormGroup>
      </FormGroup>
      <Button color="primary" size="lg" block>Submit Answer</Button>
      </Form>
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