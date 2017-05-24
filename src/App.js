import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import Header from  './components/Header';
//import Menu from  './components/Menu';
//import Tasks from  './components/Tasks';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Header">
          <Header name="My DashBoard" />
        </div>
        <div className="Menu">
          
        </div>
        <div className="Tasks">
          
        </div>
      </div>
    );
  }
}

export default App;
//<Menu />
//<Tasks />