import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Row, Col, CardBody, Table } from 'reactstrap';

class UserStat extends Component {
  

  render() {
    const { name, avatarURL, answers, questions} = this.props.user
    const numAnswers = Object.keys(answers).length
    const numQuestions = questions.length;
  
    return (
      <Card>
        <CardBody>
        <Row>
          <Col>
            <img src={avatarURL}  alt={`Player`} className='photo'/> 
          </Col>
          <Col>
            <Table borderless>
              <tbody>
                <tr>
                  <td className="title">{name}</td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td>Answered Questions:</td>
                  <td>{ numAnswers }</td>
                </tr>
                <tr>
                  <td>Created Questions:</td>
                  <td>{ numQuestions}</td>
                </tr>
                <tr>
                  <td>Overall Score:</td>
                  <td className="active text-success">{ numAnswers + numQuestions }</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </CardBody>
    </Card>
    )
  }
}

function mapStateToProps({users}, {id}) {
  const user = users[id]
  
  return {
   user
  }
}

export default connect(mapStateToProps)(UserStat)