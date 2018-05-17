import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { fullWhite, green600, blue600 } from "material-ui/styles/colors";
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class ParkingLot extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  mainButton = () => {
    if (this.props.booked) {
      return <FlatButton label='Cancel reservation' onClick={() => console.log(2)} secondary={true}/>;
    } else if (this.props.shared) {
      return <FlatButton label='Cancel sharing' onClick={() => console.log(2)} secondary={true} style={{margin: '30px 0 10px'}}/>;
    } else {
      return <FlatButton label='Book now' onClick={() => console.log(2)} primary={true}/>;
    }
  }

  render() {
    return (
      <MuiThemeProvider>
      <span style={{display: 'inline-grid'}}>
            <div style={{margin: '10px', display: 'inline-block'}}>
                <Paper style={{
                  backgroundColor: 'rgba(0, 0, 0, .5)',
                  borderRadius: '2px 2px 0 0',
                  width: (this.props.booked || this.props.shared) ? 220: 150,
                  'height': '40px'
                }} zDepth={1}>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 10px'}}>
                    <div style={{
                      color: 'white', display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'baseline'
                    }}>
                  <div>
                    2018-01-01
                  </div>
                  <div>
                    { this.props.shared ? '2018-01-02' : 'Level -2' }
                  </div>
                </div>
                  {!this.props.shared && <Avatar
                    color={fullWhite}
                    backgroundColor={!this.props.booked ? green600 : blue600 }
                    size={48}
                    style={{marginTop: 3}}
                  >
                    106
                  </Avatar>}
                </div>
            </Paper>
              <Paper style={{width: (this.props.booked || this.props.shared) ? 220: 150, height: 116, borderRadius: '0 0 2px 2px', padding: '0 10px'}} zDepth={1}>
                {!this.props.shared && <FlatButton label="Details" onClick={() => console.log(1)} style={{margin: '15px 0 10px'}}/>}
                {this.mainButton()}
              </Paper>
            </div>
          </span>
      </MuiThemeProvider>
    );
  }
}
