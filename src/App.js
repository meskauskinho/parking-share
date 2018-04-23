import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Button, Image, Panel, Form, FormGroup, Col, Checkbox, ControlLabel, FormControl } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';

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
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event, picker){
    console.log(picker);
    this.setState({ startDate: picker.startDate.format('LLL') });
    this.setState({ endDate: picker.endDate.format('LLL') });
    // An object with two keys,
    // 'startDate' and 'endDate' which are Momentjs objects.
  }

  render() {
    moment.locale(locale);
    return (
      <div className="App">
          <MuiThemeProvider>
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
              <NavItem eventKey={1} href="#">
                Logout
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="Container">
          <div className="ContainerContent">
            <Panel bsStyle="info">
              <Panel.Heading>
                <Panel.Title componentClass="h3">Panel heading with a title</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <div className="ContainerBody">
                  <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">

                        <FormControl type="email" placeholder="Email" />

                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword">

                        <FormControl type="password" placeholder="Password" />

                    </FormGroup>
                    <FormGroup>

                        <Button bsStyle="primary" type="submit">Sign in</Button>

                    </FormGroup>
                  </Form>

                  <DateRangePicker
                      minDate={moment()}
                      buttonClasses={smallDevice ? ['btn btn-lg'] : ['btn btn-sm']}
                      onApply={this.handleSelect}
                      applyClass="btn-primary"
                      opens="center"
                      containerClass="Datepicker">
                    <Button bsStyle="info">
                      Share my parking space
                    </Button>
                  </DateRangePicker>
                    <RaisedButton label="Default" />
                </div>
              </Panel.Body>
            </Panel>
          </div>
        </div></MuiThemeProvider>
      </div>
    );
  }
}

export default App;
