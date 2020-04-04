import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Homepage from './Homepage'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import Nav from './Nav'
import SignIn from './SignIn'
import Question from './Question'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
       <Fragment>
         <LoadingBar />
         <div className='container'>
           <Nav />
           {this.props.loading === true
             ? null
             : <div>
                 <Route path='/' exact component={SignIn} />
                 <Route path='/question/:id' component={Question} />
                 <Route path='/add' component={NewQuestion} />
                 <Route path='/leaderboard' component={Leaderboard} />
                 <Route path='/homepage' component={Homepage} />
               </div>}
         </div>
       </Fragment>
     </Router>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    loading: authedUser===null
  }
}
export default connect(mapStateToProps)(App)