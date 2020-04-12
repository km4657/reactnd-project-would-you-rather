import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import ReactMinimalPieChart from 'react-minimal-pie-chart'
import { Table, CardBody, CardText, CardTitle, Row, Col } from 'reactstrap';
import star from '../star.png'



class Results extends Component {
  render() {
    const { question} = this.props

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

    const { name, optionOneText, optionTwoText, optionOneVotes, optionTwoVotes, hasAnsweredOne } = question
    
   
    const option1color = `${hasAnsweredOne?'#5cb85c':'#0275d8'}`
    const option2color = `${hasAnsweredOne?'#0275d8':'#5cb85c'}`
    const option1per = ` ${(optionOneVotes/(optionOneVotes + optionTwoVotes) * 100).toFixed(0)}%`
    const option2per = ` ${(optionTwoVotes/(optionOneVotes + optionTwoVotes) * 100).toFixed(0)}%`

    const option1label = `${optionOneVotes}/${optionOneVotes + optionTwoVotes},${option1per}`
    const option2label = `${optionTwoVotes}/${optionOneVotes + optionTwoVotes},${option2per}`
   
    return (
      <CardBody>
        <CardTitle className="font-italic">
          {name} asked:
        </CardTitle>
        <CardText className="title">
          Would you rather...
        </CardText>
        <br></br>
        <Row>
        <Col>
        <ReactMinimalPieChart
          animate={false}
          animationDuration={500}
          animationEasing="ease-out"
          cx={50}
          cy={50}
          data={ 
            [
            {
              color: option1color,
              value: optionOneVotes,
              label: option1label
            },
            {
              color: option2color,
              value: optionTwoVotes,
              label: option2label
            }]
          }
          label
          labelPosition={60}
          labelStyle={{
            fontFamily: 'sans-serif',
            fontSize: '12px'
          }}
          title
          lengthAngle={360}
          lineWidth={20}
          paddingAngle={18}
          radius={50}
          rounded
          startAngle={0}
          style={{
            height: '150px'
          }}
          viewBoxSize={[
            100,
            100
          ]}
        />
        </Col>
        <Col>
          <CardText className={ hasAnsweredOne ? "option text-success" : "option text-primary"} >{optionOneText}</CardText>
          <CardText className={ hasAnsweredOne ? "option text-primary" : "option text-success"} >{optionTwoText}?</CardText>
        </Col>
        </Row>
        <Row></Row>
        <Row>
          <Table borderless>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Number of Votes</th>
                <th>Percentage of Votes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{hasAnsweredOne?<img
                    src={star}
                    alt={`Your Choice`}
                    className='star'
                    />:''}</td>
                <td>{optionOneText}</td>
                <td>{optionOneVotes}</td>
                <td>{option1per}</td>
              </tr>
              <tr>
                <td>{hasAnsweredOne?'':
                  <img
                  src={star}
                  alt={`Your Choice`}
                  className='star'
                  />}</td>
                <td>{optionTwoText}</td>
                <td>{optionTwoVotes}</td>
                <td>{option2per}</td>
              </tr>
            </tbody>
          </Table>
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

export default connect(mapStateToProps)(Results)