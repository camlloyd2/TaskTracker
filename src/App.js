import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import Header from  './components/Header';
import Menu from  './components/Menu';
import Tasks from  './components/Tasks';
import Time from 'react-time';
require("./styles/datetime.css");

var fam = {name: "fam"};
var apartment = {name: "apartment"}
var groups1 = [fam,apartment];
var _this

var task1 = {group:"fam",name:"Take out the trash",imp:"2",due:"5/15/2017",completed:false};
var task2 = {group:"apartment",name:"Dishes",imp:"5",due:"5/30/2017",completed:false};
var task3 = {group:"dev team",name:"Vacuuming",imp:"1",due:"5/21/2017",completed:false};
class App extends Component {
  constructor(props){
    super(props);
    _this = this;
    this.state = {
      tasks1:[task1,task2,task3]
    }
  }
    render() {
      console.log(_this.state.tasks1);
      return (
        <div className="App">
          <div className="Header">
          <Header name="My DashBoard" />
        </div>
        <div className="Menu">
          <Menu groups={groups1}/>
        </div>
        <div className="Tasks">
          <Tasks confirmComplete={confirmComplete} tasks={this.state.tasks1}/>
        </div>
      </div>
    );
    }
}

function confirmComplete(key){
    var bool = window.confirm("Are you sure you have completed this task?");
    if(bool){
      console.log(key);
      console.log(_this.state.tasks1[0]);
      _this.state.tasks1[key].completed =true;
      _this.setState({
        tasks1: _this.state.tasks1
      });
    }
}

export default App;
