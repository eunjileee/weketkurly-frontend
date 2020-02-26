import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Main from './Pages/Main/Main';
import Nav from './Components/Nav';
import Footer from './Components/Footer';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/footer" component={Footer} />
          <Route exact path="/nav" component={Nav} />
        </Switch>
      </Router>
    )
  }
}

export default Routes;