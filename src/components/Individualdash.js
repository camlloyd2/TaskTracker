import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../styles/Individualdash.css';
import Header from  './Header';
import Menu from  './Menu';
import Tasks from  './Tasks';
import star from '../images/star.gif';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import SingleTask from './SingleTask.js';
require("../styles/datetime.css");
//var PropTypes = require('prop-types');

var fam = {name: "fam"};
var apartment = {name: "apartment"}
var groups1 = [fam,apartment];
var _this;

var data = localStorage;
// var task1 = {group:fam,name:"Trash",member:"will",imp:2,due:"5/31/2017",completed:false};
// var task2 = {group:apartment,name:"Dishes",member:"cam",imp:4,due:"6/2/2017",completed:false};
// var task3 = {group:fam,name:"Clothes",member:"will",imp:3,due:"5/30/2017",completed:false};
// var tasks = JSON.stringify([task1,task2,task3]);
// var test_task = [{group:fam},{name:'clothes'}]
//data.setItem('tasks', tasks);


export default class Individualdash extends Component {
  constructor(props){
    super(props);
    _this = this;
    var tasks = {tasks:[].concat(JSON.parse(data.getItem('tasks')))};
    this.state = tasks;
  }
    render() {
      console.log(this);
      var tasks = this.state.tasks.map((data,i) => {
        return (
          <TableRow hidden={data.completed}>
                <TableRowColumn>{data.group.name}</TableRowColumn>
                <TableRowColumn>{data.name}</TableRowColumn>
                <TableRowColumn>{data.imp}</TableRowColumn>
                <TableRowColumn>{data.due}</TableRowColumn>
                <TableRowColumn><button onClick={() => confirmComplete(i)}>Complete!</button></TableRowColumn>
            </TableRow>
        )
      })
      return (
        <div className="App">
          <div className="Header">
          <Header name="My DashBoard" />
          </div>
          <div className="Menu">
          <Menu groups={groups1}/>
          </div>
          <Table className="taskTable">
                <TableHeader>
                    <TableRow >
                        <TableHeaderColumn>Group</TableHeaderColumn>
                        <TableHeaderColumn>Task Name</TableHeaderColumn>
                        <TableHeaderColumn>Importance</TableHeaderColumn>
                        <TableHeaderColumn>Due on</TableHeaderColumn>
                        <TableHeaderColumn><img className="completeStar" src={star} /></TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks}
                </TableBody>
            </Table>
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
