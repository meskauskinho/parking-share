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
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

import {
  fullWhite,
  green400,
} from 'material-ui/styles/colors';

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
        <MuiThemeProvider>{newCancelButton}</MuiThemeProvider>
        <MuiThemeProvider>{newApplyButton}</MuiThemeProvider>
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
            <MuiThemeProvider>
              <Paper style={{ 'background-color': 'rgba(3, 73, 153, .2)', 'border-radius': '2px 2px 0 0', 'height': '90px', display: 'flex', 'align-items': 'flex-end' }} zDepth={3}>
                <span style={{
                  'background-color': 'rgba(3, 73, 153, 1)',
                  'color': 'white',
                  'padding': '4px 40px 0 20px',
                  'font-size': '25px',
                }}>Ruptela Parking</span>
              </Paper>
            </MuiThemeProvider>
            <MuiThemeProvider>
            <Paper style={{ 'background-color': 'rgba(255, 255, 255, .9)', 'border-radius': '0 0 2px 2px' }} zDepth={3}>

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
          </Paper>
            </MuiThemeProvider>
          </div>
        </div>
        <div>
        <MuiThemeProvider>



          <span>
            <div style={{margin: '10px', display: 'inline-block'}}>
              <Paper style={{ 'background-color': 'rgba(0, 0, 0, .5)', 'border-radius': '2px 2px 0 0', width: 150, 'height': '40px'}} zDepth={1}>
                <div style={{display: 'flex', 'justify-content': 'space-between', 'padding': '0 10px'}}>
                    <div style={{color: 'white',     display: 'flex',
                      'flex-direction': 'column',
                      'align-items': 'baseline'}}>
                  <div>
                    2018-01-01
                  </div>
                      <div>
                    Level -2
                  </div>
                </div>
              <Avatar
                color={fullWhite}
                backgroundColor={green400}
                size={48}
                style={{'margin-top': 3}}
              >
          183
        </Avatar>
                </div>
            </Paper>
              <Paper style={{width: 150, height: 116, 'border-radius': '0 0 2px 2px', padding: '0 10px'}} zDepth={1}>
                <FlatButton label="Details" onClick={() => console.log(1)} style={{margin: '15px 0 10px'}}/>
                <FlatButton label="Book now" onClick={() => console.log(2)} primary={true}/>
              </Paper>
            </div>
          </span>

          <span>
            <div style={{margin: '10px', display: 'inline-block'}}>
              <Paper style={{ 'background-color': 'rgba(0, 0, 0, .5)', 'border-radius': '2px 2px 0 0', width: 150, 'height': '40px'}} zDepth={1}>
                <div style={{display: 'flex', 'justify-content': 'space-between', 'padding': '0 10px'}}>
                    <div style={{color: 'white',     display: 'flex',
                      'flex-direction': 'column',
                      'align-items': 'baseline'}}>
                  <div>
                    2018-01-01
                  </div>
                      <div>
                    Level -2
                  </div>
                </div>
              <Avatar
                color={fullWhite}
                backgroundColor={green400}
                size={48}
                style={{'margin-top': 3}}
              >
          183
        </Avatar>
                </div>
            </Paper>
              <Paper style={{width: 150, height: 116, 'border-radius': '0 0 2px 2px', padding: '0 10px'}} zDepth={1}>
                <FlatButton label="Details" onClick={() => console.log(1)} style={{margin: '15px 0 10px'}}/>
                <FlatButton label="Book now" onClick={() => console.log(2)} primary={true}/>
              </Paper>
            </div>
          </span>

          <span>
            <div style={{margin: '10px', display: 'inline-block'}}>
              <Paper style={{ 'background-color': 'rgba(0, 0, 0, .5)', 'border-radius': '2px 2px 0 0', width: 150, 'height': '40px'}} zDepth={1}>
                <div style={{display: 'flex', 'justify-content': 'space-between', 'padding': '0 10px'}}>
                    <div style={{color: 'white',     display: 'flex',
                      'flex-direction': 'column',
                      'align-items': 'baseline'}}>
                  <div>
                    2018-01-01
                  </div>
                      <div>
                    Level -2
                  </div>
                </div>
              <Avatar
                color={fullWhite}
                backgroundColor={green400}
                size={48}
                style={{'margin-top': 3}}
              >
          106
        </Avatar>
                </div>
            </Paper>
              <Paper style={{width: 150, height: 116, 'border-radius': '0 0 2px 2px', padding: '0 10px'}} zDepth={1}>
                <FlatButton label="Details" onClick={() => console.log(1)} style={{margin: '15px 0 10px'}}/>
                <FlatButton label="Book now" onClick={() => console.log(2)} primary={true}/>
              </Paper>
            </div>
          </span>

          <span>
            <div style={{margin: '10px', display: 'inline-block'}}>
              <Paper style={{ 'background-color': 'rgba(0, 0, 0, .5)', 'border-radius': '2px 2px 0 0', width: 150, 'height': '40px'}} zDepth={1}>
                <div style={{display: 'flex', 'justify-content': 'space-between', 'padding': '0 10px'}}>
                    <div style={{color: 'white',     display: 'flex',
                      'flex-direction': 'column',
                      'align-items': 'baseline'}}>
                  <div>
                    2018-01-01
                  </div>
                      <div>
                    Level -2
                  </div>
                </div>
              <Avatar
                color={fullWhite}
                backgroundColor={green400}
                size={48}
                style={{'margin-top': 3}}
              >
          89
        </Avatar>
                </div>
            </Paper>
              <Paper style={{width: 150, height: 116, 'border-radius': '0 0 2px 2px', padding: '0 10px'}} zDepth={1}>
                <FlatButton label="Details" onClick={() => console.log(1)} style={{margin: '15px 0 10px'}}/>
                <FlatButton label="Book now" onClick={() => console.log(2)} primary={true}/>
              </Paper>
            </div>
          </span>

        </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default App;
