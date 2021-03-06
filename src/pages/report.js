import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

export default class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parkingSpace: "",
      licencePlate: "",
      showMessage: false,
    };
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm() {
    return  this.state.parkingSpace.length > 0 && this.state.licencePlate.length > 0;
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.post('sessions', {
      parkingSpace: this.state.parkingSpace,
      licencePlate: this.state.licencePlate,
    })
      .then(res => {
        this.setState({showMessage: true});
      })
      .catch(
        () => {
          this.setState({showMessage: true});
        }
      );
  }

  render() {
    return (
      <div className="Container">
        <div className="ContainerContent">
          <MuiThemeProvider>
            <Paper style={{'background-color': 'rgba(255, 255, 255, .9)', 'border-radius': '0 0 2px 2px'}} zDepth={1}>

              <div className="ContainerBody">
                <Form horizontal onSubmit={this.handleSubmit}>
                  <FormGroup controlId="formHorizontalParkingSpace">
                    <MuiThemeProvider>
                      <TextField
                        hintText=""
                        floatingLabelText="Parking space"
                        onChange={(event, value) => this.setState({parkingSpace: value, error: false })}
                      />
                    </MuiThemeProvider>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalLicencePlate">
                    <MuiThemeProvider>
                      <TextField
                        hintText=""
                        floatingLabelText="Licence plate"
                        onChange={(event, value) => this.setState({licencePlate: value, error: false })}
                      />
                    </MuiThemeProvider>
                  </FormGroup>
                  <FormGroup>
                    <br/>
                    <br/>
                    <MuiThemeProvider>
                      <RaisedButton onClick={this.handleSubmit} label="Report improper parking" disabled={!this.validateForm()} type="submit"
                                    primary={true}/>
                    </MuiThemeProvider>
                  </FormGroup>
                </Form>
              </div>
            </Paper>
          </MuiThemeProvider>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.showMessage}
          onClose={() => this.setState({showMessage: false})}
          autoHideDuration={3000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">I love snacks</span>}
        />
      </div>
    );
  }
}
