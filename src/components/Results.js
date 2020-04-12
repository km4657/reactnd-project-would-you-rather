import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import ReactMinimalPieChart from 'react-minimal-pie-chart'
import { CardBody, CardText, CardTitle, Row, Col } from 'reactstrap';
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
          animate
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
          label= {props => { return props.data[props.dataIndex].label;}}
          labelPosition={60}
          labelStyle={{
            fontFamily: 'sans-serif',
            fontSize: '7px'
          }}
          title
          lengthAngle={360}
          lineWidth={20}
          paddingAngle={18}
          radius={50}
          rounded
          startAngle={0}
          style={{
            height: '200px'
          }}
          viewBoxSize={[
            100,
            100
          ]}
        />
        </Col>
        <Col xs="auto">
          <CardText className={ hasAnsweredOne ? "option text-success" : "option text-primary"} >{hasAnsweredOne?<img
              src={star}
              alt={`Your Choice`}
              className='avatar'
            />:''}{optionOneText} OR</CardText>
          <CardText className={ hasAnsweredOne ? "option text-primary" : "option text-success"} >{hasAnsweredOne?'':
              <img
              src={star}
              alt={`Your Choice`}
              className='avatar'
            />}{optionTwoText}?</CardText>
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

export default connect(mapStateToProps)(Results)