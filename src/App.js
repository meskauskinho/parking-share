import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Button, Image, Panel, Form, FormGroup, Col, Checkbox, ControlLabel, FormControl } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import $ from 'jquery';

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

  componentDidMount() {
    this.replaceCalendarButtons();
  }

  handleSelect(event, picker){
    console.log(picker);
    this.setState({ startDate: picker.startDate.format('LLL') });
    this.setState({ endDate: picker.endDate.format('LLL') });
    // An object with two keys,
    // 'startDate' and 'endDate' which are Momentjs objects.
  }

  replaceCalendarButtons() {
    const inputContainer = document.getElementsByClassName('range_inputs')[0];
    const existedNewInputContainer = document.getElementById('new_range_inputs');
    const newInputContainer = existedNewInputContainer || document.createElement('div');
    const applyButton = inputContainer.children[0];
    const cancelButton = inputContainer.children[1];
    const newApplyButton = <FlatButton
      label="Apply"
      disabled={this.state.disabledApply}
      primary={true}
      onClick={() => applyButton.click()}/>;
    const newCancelButton = <FlatButton label="Cancel" onClick={() => cancelButton.click()}/>;
    newInputContainer.id = 'new_range_inputs';
    applyButton.style.display = 'none';
    cancelButton.style.display = 'none';
    inputContainer.appendChild(newInputContainer);
    this.setState({ disabledApply: applyButton.disabled });
    ReactDOM.render(
      <div>
        <MuiThemeProvider>{newApplyButton}</MuiThemeProvider>
        <MuiThemeProvider>{newCancelButton}</MuiThemeProvider>
      </div>,
      newInputContainer
    );
    setInterval(() => {
      const isDisabled = this.state.disabledApply;
      if (isDisabled !== applyButton.disabled) {
        this.setState({ disabledApply: applyButton.disabled });
        ReactDOM.render(
          <div>
            <MuiThemeProvider>
              <FlatButton
                label="Apply"
                disabled={this.state.disabledApply}
                primary={true}
                onClick={() => applyButton.click()}/>
            </MuiThemeProvider>
            <MuiThemeProvider>{newCancelButton}</MuiThemeProvider>
          </div>,
          newInputContainer
        );
      }
    }, 200);
  }

  render() {
    moment.locale(locale);
    return (
      <div className="App">
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
                      <MuiThemeProvider>
                        <TextField
                          hintText=""
                          floatingLabelText="Email"
                          onChange={(event, value) => this.setState({ mail: value })}
                        />
                      </MuiThemeProvider>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword">
                      <MuiThemeProvider>
                        <TextField
                          hintText=""
                          floatingLabelText="Password"
                          type="password"
                          onChange={(event, value) => this.setState({ password: value })}
                        />
                      </MuiThemeProvider>
                    </FormGroup>
                    <FormGroup>
                      <br/>
                      <br/>
                      <MuiThemeProvider>
                        <RaisedButton onClick={() => console.log(this.state.mail, this.state.password)} label="Sign in" primary={true}/>
                      </MuiThemeProvider>
                    </FormGroup>
                  </Form>

                  <DateRangePicker
                      minDate={moment()}
                      onApply={this.handleSelect}
                      opens="center"
                      containerClass="Datepicker">
                    <MuiThemeProvider>
                      <RaisedButton label="Share my parking space" primary={true}/>
                    </MuiThemeProvider>
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
