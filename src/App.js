import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import Login from './pages/login.js';
import MainPage from './pages/main.js';
import Report from './pages/report.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import 'moment/min/locales.min.js';
import moment from 'moment';

// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';

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
      <HashRouter>
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
                    <NavItem eventKey={1} href="/#/">
                      Main
                    </NavItem>
                    <NavItem eventKey={2} href="/#/report">
                      Report improper parking
                    </NavItem>
                  </Nav>
                  <Nav pullRight>
                    <NavItem eventKey={1} href="#" onClick={() => { localStorage.removeItem('token');localStorage.removeItem('email');window.location.href = '/#/login'; }}>
                      Logout
                    </NavItem>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            )
          }<MuiThemeProvider>
            <div>
              <Route exact path='/' component={MainPage} />
              <Route path='/login' component={Login} />
              <Route path='/report' component={Report} />
            </div>
          </MuiThemeProvider>
        </div>
      </HashRouter>
    );
  }
}

export default App;
