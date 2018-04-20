import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Button, Image, Panel, Form, FormGroup, Col, Checkbox, ControlLabel, FormControl } from 'react-bootstrap';

import 'moment/min/locales.min.js';
import moment from 'moment';

import DateRangePicker from 'react-bootstrap-daterangepicker';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';

const smallDevice = window.matchMedia('(max-width: 679px)').matches;
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
    moment.locale(locale);console.log(moment.locale());
    return (
      <div className="App">
        <Navbar collapseOnSelect fixedTop inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand">React-Bootstrap</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">
                Link
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                Link Right
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link Right
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
                      <Col sm={10}>
                        <FormControl type="email" placeholder="Email" />
                      </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword">
                      <Col sm={10}>
                        <FormControl type="password" placeholder="Password" />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col smOffset={2} sm={10}>
                        <Button bsStyle="primary" type="submit">Sign in</Button>
                      </Col>
                    </FormGroup>
                  </Form>

                  <DateRangePicker autoApply={true} minDate={moment()} onApply={this.handleSelect}>
                    <div>
                      {this.state.startDate} - {this.state.endDate}
                    </div>
                  </DateRangePicker>
                </div>
              </Panel.Body>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
