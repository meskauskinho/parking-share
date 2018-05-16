import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { fullWhite, green600, blue600 } from "material-ui/styles/colors";
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Label } from 'react-bootstrap';

export default class ParkingLot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <span style={{display: 'inline-grid'}}>
            <div style={{margin: '10px', display: 'inline-block'}}>
              <MuiThemeProvider>
                <Paper style={{
                  'background-color': 'rgba(0, 0, 0, .5)',
                  'border-radius': '2px 2px 0 0',
                  width: this.props.booked ? 250: 150,
                  'height': '40px'
                }} zDepth={1}>
                <div style={{display: 'flex', 'justify-content': 'space-between', 'padding': '0 10px'}}>
                    <div style={{
                      color: 'white', display: 'flex',
                      'flex-direction': 'column',
                      'align-items': 'baseline'
                    }}>
                  <div>
                    2018-01-01
                  </div>
                      <div>
                    Level -2
                  </div>
                </div>
                  {
                    !this.props.booked ? (
                      <Avatar
                        color={fullWhite}
                        backgroundColor={!this.props.booked ? green600 : blue600 }
                        size={48}
                        style={{'margin-top': 3}}
                      >
                        106
                      </Avatar>
                    ) : (
                      <div style={{
                        fontSize: '24px',
                      }}>
                        <Label bsStyle="primary" style={{padding: '2px 6px', fontWeight: 'lighter'}}>RESERVED 106</Label>
                      </div>
                    )
                  }
                </div>
            </Paper>
              <Paper style={{width: this.props.booked ? 250: 150, height: 116, 'border-radius': '0 0 2px 2px', padding: '0 10px'}} zDepth={1}>
                <FlatButton label="Details" onClick={() => console.log(1)} style={{margin: '15px 0 10px'}}/>
                <FlatButton label={!this.props.booked ? 'Book now': 'Cancel reservation'} onClick={() => console.log(2)} primary={this.props.booked ? false : true} secondary={!this.props.booked ? false : true}/>
              </Paper>
              </MuiThemeProvider>
            </div>
          </span>
    );
  }
}
