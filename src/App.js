import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Login from './pages/login.js';
import MainPage from './pages/main.js';

import 'moment/min/locales.min.js';
import moment from 'moment';

import DateRangePicker from 'react-bootstrap-daterangepicker';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';

const smallDevice = window.matchMedia('(max-width: 768px)').matches;
var locale = window.navigator.userLanguage || window.navigator.language || 'en-GB';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
    };
  }

  render() {
    moment.locale(locale);
    return (
      <main>
        <div className="App">
          {
            !window.location.href.match(/\login/) && (
              <Navbar collapseOnSelect fixedTop>
                <Navbar.Header>
                  <Navbar.Brand>
                    Ruptela Parking
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav>
                    <NavItem eventKey={1} href="#">
                      Main
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                      Report improper parking
                    </NavItem>
                  </Nav>
                  <Nav pullRight>
                    <NavItem eventKey={1} href="#" onClick={() => { localStorage.removeItem('token');localStorage.removeItem('email');window.location.href = '/login'; }}>
                      Logout
                    </NavItem>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            )
          }
          <Switch>
            <Route exact path='/'>
              <MainPage/>
            </Route>
            <Route path='/login'><Login/></Route>
          </Switch>
        </div>
      </main>
    );
  }
}

export default App;
