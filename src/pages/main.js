import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import _ from "lodash";
import moment from "moment/moment";
import ReactDOM from "react-dom";
import Avatar from 'material-ui/Avatar';
import { fullWhite, green400 } from "material-ui/styles/colors";
import ParkingLot from '../components/parkingLot.js';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledApply: false,
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
    return (
      <div>
        <div className="Container">
          <MuiThemeProvider>
            <div style={{margin: '10px', display: 'inline-block'}}>
              <Paper style={{
                'background-color': 'rgba(0, 0, 0, .5)',
                'border-radius': '2px 2px 0 0',
                width: 320,
                'height': '40px'
              }} zDepth={1}>
                <div style={{display: 'flex', 'justify-content': 'space-between', 'padding': '0 10px'}}>
                  <div style={{
                    color: 'white', display: 'flex',
                    'flex-direction': 'column',
                    'align-items': 'baseline'
                  }}>
                    <div>
                      { localStorage.getItem('email') }
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
              <Paper style={{width: 320, height: 80, 'border-radius': '0 0 2px 2px', padding: '0 10px'}} zDepth={1}>
                <DateRangePicker
                  minDate={moment()}
                  onApply={this.handleSelect}
                  opens="center"
                  onShow={() => window.scrollTo(0, 0)}
                  containerClass="Datepicker">
                  <RaisedButton label="Share my parking space" primary={true} style={{ margin: 25 }}/>
                </DateRangePicker>
              </Paper>
            </div>
          </MuiThemeProvider>
        </div>
        <div style={{ display: 'flex', backgroundColor: 'white', padding: '5px 20px', marginTop: 40, alignItems: 'center'}}>
          <span style={{ paddingLeft: 20}}>Periods of sharing your parking space</span>
        </div>
        <div style={{ paddingTop: 10, backgroundColor: 'rgba(255,255,255,.6)'}}>
          <ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/>
        </div>
      </div>
    );
  }
}
