import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import _ from "lodash";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    if (!_.isNil(localStorage.getItem('token'))) {
      window.location.replace('/');
    }
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
    axios.post('sessions', {
      username: this.state.email,
      password: this.state.password,
    })
      .then(res => {
        const {id, username} = res.data;
        localStorage.setItem('token', id);
        localStorage.setItem('email', username);
        window.location.replace('/');
      })
      .catch(
        () => {
          this.setState({ error: true });
          localStorage.removeItem('token');
          localStorage.removeItem('email');
        }
      );
  }

  render() {
    return (
      <div className="Container">
        <div className="ContainerContent">
          <MuiThemeProvider>
            <Paper style={{
              'background-color': 'rgba(3, 73, 153, .2)',
              'border-radius': '2px 2px 0 0',
              'height': '90px',
              display: 'flex',
              'align-items': 'flex-end'
            }} zDepth={3}>
                <span style={{
                  'background-color': 'rgba(3, 73, 153, 1)',
                  'color': 'white',
                  'padding': '4px 40px 0 10px',
                  'font-size': '25px',
                }}>Ruptela Parking</span>
            </Paper>
          </MuiThemeProvider>
          <MuiThemeProvider>
            <Paper style={{'background-color': 'rgba(255, 255, 255, .9)', 'border-radius': '0 0 2px 2px'}} zDepth={3}>

              <div className="ContainerBody">
                <Form horizontal>
                  <FormGroup controlId="formHorizontalEmail">
                    <MuiThemeProvider>
                      <TextField
                        hintText=""
                        floatingLabelText="Email"
                        onChange={(event, value) => this.setState({email: value, error: false })}
                      />
                    </MuiThemeProvider>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalPassword">
                    <MuiThemeProvider>
                      <TextField
                        hintText=""
                        floatingLabelText="Password"
                        type="password"
                        onChange={(event, value) => this.setState({password: value, error: false })}
                      />
                    </MuiThemeProvider>
                  </FormGroup>
                  <FormGroup>
                    <br/>
                    <br/>
                    <MuiThemeProvider>
                      <RaisedButton onClick={this.handleSubmit} label="Sign in" disabled={!this.validateForm()}
                                    primary={true}/>
                    </MuiThemeProvider>
                  </FormGroup>
                  {
                    this.state.error && (
                      <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 0, right: 0, color: 'red' }}>
                          We don't recognize this e-mail or password.
                        </div>
                      </div>
                    )
                  }
                </Form>
              </div>
            </Paper>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
