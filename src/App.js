import React, { Component, Fragment } from 'react';
import { Container } from 'reactstrap'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { SignUp } from './components/sign-up/sign-up';
import { Main } from './components/main/main';
import { Header } from './components/shared/header/header';
import { Footer } from './components/shared/footer/footer';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <div className="content">
            <Header />
            <Container>
              <Switch>
                <Route exact path="/signup" component={SignUp}/>
                <Route path="/main" test={5} component={Main}/>
                <Route exact render={() => (<div>Please sign up before work</div>)} />
              </Switch>
            </Container>
          </div>
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

export default App;
