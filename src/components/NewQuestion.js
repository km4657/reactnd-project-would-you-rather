import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Card, CardText, CardTitle, Button, Form, FormGroup, Input, CardBody } from 'reactstrap';
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {

  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }

  handleChangeOne = (e) => {
    const optionOneText = e.target.value
    this.setState(() => ({
      optionOneText
    }))
  }

  handleChangeTwo = (e) => {
    const optionTwoText = e.target.value
    this.setState(() => ({
      optionTwoText
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props
   
    dispatch(handleAddQuestion(optionOneText, optionTwoText))
    
    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true,
    }))
  }


  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/homepage' />
    }

    return (
      <Card>
        <CardTitle className="title">Complete the Question</CardTitle>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <CardText className="option text-primary">Would You Rather?</CardText>
            <FormGroup>
              <FormGroup>
                <Input type="text" value={optionOneText} onChange={this.handleChangeOne} placeholder="Enter option one here"/>
              </FormGroup>
              <FormGroup>
                <Input type="text" value={optionTwoText} onChange={this.handleChangeTwo} placeholder="Enter option two here" />
              </FormGroup>
            </FormGroup>
            <Button color="primary" size="lg" block>Add Question</Button>
          </Form>
        </CardBody>
      </Card>
    )
  }
}


export default connect()(NewQuestion)