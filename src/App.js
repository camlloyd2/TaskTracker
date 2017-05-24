import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import Header from  './components/Header';
import Menu from  './components/Menu';
//import Tasks from  './components/Tasks';

class App extends Component {
  render() {
    var fam = {name: "fam"};
    var apartment = {name: "apartment"}
    var groups1 = [fam,apartment];
    return (
      <div className="App">
        <div className="Header">
          <Header name="My DashBoard" />
        </div>
        <div className="Menu">
          <Menu groups={groups1}/>
        </div>
        <div className="Tasks">
        </div>
      </div>
    );
  }
}

export default App;
