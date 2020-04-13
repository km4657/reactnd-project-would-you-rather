import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Homepage from './Homepage'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import Nav from './Nav'
import SignIn from './SignIn'
import Question from './Question'



// code from tylermcginnis.com (https://tylermcginnis.com/react-router-handling-404-pages/)
const NoMatch = ({ location }) => (
  <div>
  <h3>No match for {location.pathname}</h3>
</div>
)

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
            {this.props.unauth === true
              ? <div>
                <Route path='/' component={SignIn} />
                </div>
              : <div>
                <Nav />
                <Switch>
                <Route exact path='/' component={SignIn} />
                <Route  path='/homepage' component={Homepage} />
                <Route  path='/question/:id' component={Question} />
                <Route  path='/add' component={NewQuestion} />
                <Route  path='/leaderboard' component={Leaderboard} />
                <Route  component={NoMatch} />
                </Switch>
                </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    unauth: authedUser===null
  }
}
export default connect(mapStateToProps)(App)