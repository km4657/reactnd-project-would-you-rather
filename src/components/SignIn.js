import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label>Who are you?</Label>
          <Input type="select" value={username} onChange={this.handleChange}>
            {this.props.userIds.map((id) => (
                <option key={id} value={id}>{id}</option>
            ))}
          </Input>
        </FormGroup>
        <Button color="primary" size="lg" disabled={username === ''} block>Submit</Button>
      </Form>
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