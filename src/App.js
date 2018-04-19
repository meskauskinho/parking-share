import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Button, Image, Panel, Form, FormGroup, Col, Checkbox, ControlLabel, FormControl } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar collapseOnSelect fixedTop inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand">React-Bootstrap</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">
                Link
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                Link Right
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link Right
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
                      <Col componentClass={ControlLabel} sm={2}>
                        Email
                      </Col>
                      <Col sm={10}>
                        <FormControl type="email" placeholder="Email" />
                      </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword">
                      <Col componentClass={ControlLabel} sm={2}>
                        Password
                      </Col>
                      <Col sm={10}>
                        <FormControl type="password" placeholder="Password" />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col smOffset={2} sm={10}>
                        <Button bsStyle="primary" type="submit">Sign in</Button>
                      </Col>
                    </FormGroup>
                  </Form>
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
