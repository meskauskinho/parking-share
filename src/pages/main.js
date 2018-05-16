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
    if (!inputContainer) {
      return;
    }
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
      <MuiThemeProvider>
      <div>
        <div className='subheader container'>
          <span>
            <div className='subheader-item'>
              <div>
                <div className='subheader-item-label'>Today 2018-02-19</div>
                <div>Not shared</div>
              </div>
            </div>
          </span>
          <span>
            <div className='subheader-item'>
              <div>
                <div className='subheader-item-label'>Tomorrow 2018-02-20</div>
                <div>Shared</div>
              </div>
            </div>
          </span>
          <span>
            <div className='subheader-item'>
              <DateRangePicker
                minDate={moment()}
                onApply={this.handleSelect}
                opens="center"
                onShow={() => window.scrollTo(0, 0)}
                containerClass="Datepicker">
              <FlatButton label="Share my parking space" primary={true} style={{marginTop: 8, marginRight: 5}}/>
            </DateRangePicker>
            <Avatar
              color={fullWhite}
              backgroundColor={green400}
              size={48}
              style={{'margin-top': 3}}
            >
              106
            </Avatar>
          </div>
          </span>
        </div>
        <div className='subheader container'>
          <span>
            <div className='subheader-item'>
              <div>
                <div className='subheader-item-label'>Today 2018-02-19</div>
                <div>Reserved 106</div>
              </div>
            </div>
          </span>
          <span>
            <div className='subheader-item'>
              <div>
                <div className='subheader-item-label'>Tomorrow 2018-02-20</div>
                <div>Not reserved</div>
              </div>
            </div>
          </span>
        </div>
        <div className="Container">
          <div style={{margin: '10px', display: 'inline-block'}}>
            <div style={{ paddingTop: 10}}>
              <ParkingLot booked={true}/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/><ParkingLot/>
            </div>
          </div>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}
