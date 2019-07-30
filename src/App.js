import React, {Component} from 'react';
import { Button, Jumbotron, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
var fs = require('fs');


class App extends Component{
  constructor(props){
    super(props)
    this.state = {}
    this.state.upcoming_log = "bleh"
    this.state.results_log = "blah"
  }


  componentWillUnmount() {
    clearInterval(this.interval);
  }



  componentDidMount(){
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10)
    {
        dd='0'+dd;
    }

    if(mm<10)
    {
        mm='0'+mm;
    }
    today = yyyy + '-'+mm+'-'+dd;
    console.log(today);
    //TODO separate README file from data get
    fetch("./" + today + '-load_upcoming.py.log')
      .then(response=>response.text())
      .then(log=>this.setState({'upcoming_log':log}))
    fetch("./" + today + '-load_results.py.log')
      .then(response=>response.text())
      .then(log=>this.setState({'results_log':log}))
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 10000);
  }

  render(){
    let formatted_upcoming_log = this.state.upcoming_log.split('\n').reverse().map(i => {
      return <p>{i}</p>
    });
    let formatted_results_log = this.state.results_log.split('\n').reverse().map(i => {
      return <p>{i}</p>
    });
    return (
      <div className="App">
        <Container fluid>
          <Jumbotron className='title-jumbo'>
            <h1>CSGO Match Database Builder</h1>
          </Jumbotron>
          <Row>
            <Col className="log_column" md={6}>
              <Card>
                <Card.Body><h4>load_results.py</h4></Card.Body>
              </Card>
              <div>
                {formatted_results_log}
              </div>
            </Col>
            <Col className="log_column" md={{ span: 6, offset: 6}}>
              <Card>
                <Card.Body><h4>load_upcoming.py</h4></Card.Body>
              </Card>
              <div>
                {formatted_upcoming_log}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App;
