import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { fullWhite, green400 } from "material-ui/styles/colors";
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
      <span>
            <div style={{margin: '10px', display: 'inline-block'}}>
              <MuiThemeProvider>
                <Paper style={{
                  'background-color': 'rgba(0, 0, 0, .5)',
                  'border-radius': '2px 2px 0 0',
                  width: 150,
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
                    this.props.avatar && (
                      <Avatar
                        color={fullWhite}
                        backgroundColor={green400}
                        size={48}
                        style={{'margin-top': 3}}
                      >
                        106
                      </Avatar>
                    )
                  }
                </div>
            </Paper>
              <Paper style={{width: 150, height: 116, 'border-radius': '0 0 2px 2px', padding: '0 10px'}} zDepth={1}>
                <FlatButton label="Details" onClick={() => console.log(1)} style={{margin: '15px 0 10px'}}/>
                <FlatButton label="Book now" onClick={() => console.log(2)} primary={true}/>
              </Paper>
              </MuiThemeProvider>
            </div>
          </span>
    );
  }
}
