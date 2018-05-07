import React, { Component } from 'react';
import { Container } from 'reactstrap'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { SignUp } from './components/sign-up/sign-up';
import { Main } from './components/main/main';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <ul>
            <li><Link to="/signup">Sign up</Link></li>
          </ul>

          <hr/>
          <Switch>
            <Route exact path="/signup" component={SignUp}/>
            <Route path="/main" component={Main}/>
            <Route exact render={() => (<div>Please sign up before work</div>)} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
