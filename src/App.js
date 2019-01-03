import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar';
import Portfolio from './components/Portfolio';
import Container from "reactstrap/es/Container";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar_url : 'https://www.googleapis.com/calendar/v3/calendars/martinusmaco@gmail.com/events?key=AIzaSyCEkYFfS9avBnjXP1xX5EJBm2gm3rrHuh4'
    };
  }
  render() {
    return (
        <Container>
            <Calendar url={this.state.calendar_url}/>
            <Portfolio/>
        </Container>
    );
  }
}

export default App;
