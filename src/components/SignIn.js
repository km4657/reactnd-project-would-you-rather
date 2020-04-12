import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import yoda from '../yoda.png'
import { Button, Form, FormGroup, Input, Card, CardBody } from 'reactstrap';

class SignIn extends Component {


  state = {
    username: ''
  }
  
  handleChange = (e) => {
    const username = e.target.value
    this.setState(() => ({
        username
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { username } = this.state

    const { dispatch } = this.props
   
    dispatch(setAuthedUser(username))
    
    this.setState(() => ({
      username: ''
    }))
     this.props.history.push(`/homepage`)
  }

  render() {

    const { username } = this.state
    return (
      <Card style={{ width: '20rem' }}>
      <CardBody>
      <img src={yoda}  alt={`Yoda`} className="center"/>
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <legend className="title">Ready?</legend>
          <Input type="select" value={username} onChange={this.handleChange}>
            <option key='' value=''></option>
            {this.props.userIds.map((id) => (
                <option key={id} value={id}>{id}</option>
            ))}
          </Input>
        </FormGroup>
        <Button color="secondary" size="lg" disabled={username === ''} block>Submit</Button>
      </Form>
      </CardBody>
      </Card>
    )
  }
}

function mapStateToProps({users, authedUser}) {
  return {
    authedUser,
    userIds: Object.keys(users)
      .sort((a,b) => users[b].id - users[a].id)
  }
}
export default connect(mapStateToProps)(SignIn)