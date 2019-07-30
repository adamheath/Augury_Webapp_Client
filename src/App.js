import React, {Component} from 'react';
import { Button, Jumbotron, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
var fs = require('fs');


class App extends Component{
  constructor(props){
    super(props)
    this.state = {}
    this.state.log = "bleh"
  }

  componentDidMount(){
    //TODO separate README file from data get
    console.log("CALL: componentDidMount")
    fetch("./2019-07-29-load_results.py.log")
      .then(response=>response.text())
      .then(log=>this.setState({'log':log}))

  }

  render(){
    console.log(this.state)
    return (
      <div className="App">
        <Container fluid>
          <Jumbotron className='title-jumbo'>
            <h1>CSGO Match Database Builder</h1>
          </Jumbotron>
          <Row>
            <Col>
              <Card>
                <Card.Body>matches count(): 60, groups count(): 120,  players count(): 600, </Card.Body>
              </Card>
              <Card>
                <Card.Body>Alert goes here: there are {10} Orphaned players</Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>load_results.py</Card.Body>
              </Card>
              <p>{this.state.log}</p>
            </Col>
            <Col>
            <Card>
              <Card.Body>load_upcoming.py</Card.Body>
            </Card>
              <p>{this.state.log}</p>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App;
