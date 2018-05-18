import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from "moment/moment";
import ReactDOM from "react-dom";
import Avatar from 'material-ui/Avatar';
import { blue600, fullWhite } from "material-ui/styles/colors";
import Snackbar from 'material-ui/Snackbar';
import ParkingLot from '../components/parkingLot.js';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledApply: false,
      owner: true,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.replaceCalendarButtons();
  }

  handleSelect(event, picker){
    console.log(picker);
    this.setState({ startDate: picker.startDate.format('L') });
    this.setState({ endDate: picker.endDate.format('L') });
    this.setState({showMessage: true});
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

  infoBar = () => {
    if (this.state.owner) {
      return <div className='subheader container'>
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
              backgroundColor={blue600}
              size={48}
              style={{marginTop: 3}}
            >
              106
            </Avatar>
          </div>
          </span>
      </div>;
    } else {
      return <div className='subheader container'>
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
      </div>;
    }
  }

  render() {
    return (
      <div>
        {this.infoBar()}
        <div className="Container">
          <div style={{margin: '10px', display: 'inline-block'}}>
            <div style={{ paddingTop: 10}}>
              { this.state.owner ? <ParkingLot shared={true}/> : <ParkingLot booked={true}/>}
            </div>
          </div>
        </div>
        <Snackbar
          bodyStyle={{height: 'auto', padding: '14px', lineHeight: ''}}
          open={this.state.showMessage}
          onClose={() => this.setState({showMessage: false})}
          autoHideDuration={6000}
          message={<span>Shared parking space <span style={{whiteSpace: 'nowrap'}}>from {this.state.startDate} to {this.state.endDate}</span></span>}
        />
      </div>
    );
  }
}
