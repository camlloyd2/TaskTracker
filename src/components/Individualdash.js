import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../styles/Individualdash.css';
import Header from  './Header';
import Menu from  './Menu';
import Tasks from  './Tasks';
require("../styles/datetime.css");
//var PropTypes = require('prop-types');

var fam = {name: "fam"};
var apartment = {name: "apartment"}
var groups1 = [fam,apartment];
var _this;

var task1 = {group:"fam",name:"Take out the trash",imp:"2",due:"5/15/2017",completed:false};
var task2 = {group:"apartment",name:"Dishes",imp:"5",due:"5/30/2017",completed:false};
var task3 = {group:"dev team",name:"Vacuuming",imp:"1",due:"5/21/2017",completed:false};
export default class Individualdash extends Component {
  constructor(props){
    super(props);
    _this = this;
    this.state = {
      tasks:[task1,task2,task3]
    }
  }
    render() {
      console.log(_this.state.tasks1);
      return (
        <div key="1" className="App">
          <div className="Header">
          <Header name="My DashBoard" />
        </div>
        <div key="2"className="Menu">
          <Menu groups={groups1}/>
        </div>
        <div key="3"className="Tasks">
          <Tasks confirmComplete={confirmComplete} tasks={this.state.tasks}/>
        </div>
      </div>
    );
    }
}

function confirmComplete(key){
    var bool = window.confirm("Are you sure you have completed this task?");
    if(bool){
      console.log(key);
      console.log(_this.state.tasks[0]);
      _this.state.tasks[key].completed =true;
      _this.setState({
        tasks: _this.state.tasks
      });
    }
}