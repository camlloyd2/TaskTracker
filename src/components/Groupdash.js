import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../styles/Individualdash.css';
import Header from  './Header';
import Menu from  './Menu';
import Members from './Members';
import CreateTask from './Createtask.js'
import Time from 'react-time';
import DatePicker from 'material-ui/DatePicker';
import Grouptasks from './Grouptasks';
require("../styles/datetime.css");
//var PropTypes = require('prop-types');


var fam = {name: "fam"};
var apartment = {name: "apartment"}
var groups1 = [fam,apartment];
var _this;
var group;
var now = new Date();

var task1 = {member:"cam",name:"Take out the trash",imp:"2",due:now,completed:false};
var task2 = {member:"cam",name:"Dishes",imp:"5",due:now,completed:false};
var task3 = {member:"will",name:"Vacuuming",imp:"1",due:now,completed:false};

var members = [{key:'Jack', name: 'Jack', score:7}, {key:'brent',name:'Brent',score:10}, {key:'mike',name: 'Mike', score: -4}]


export default class Groupdash extends Component {
  constructor(props){
    super(props);
    _this = this;
    group = this.props.match.params.group;
    task1.group = group;
    task2.group= group;
    task3.group=group;
    this.state = {
      members: members,
      tasks:[task1,task2,task3]
    }
  }
    addTask(task){
      var task ={group:group,name:task.name,imp:task.rating,due:task.due, completed:false}

    }
    render() {
        var members =[];
        //console.log(this.state.tasks);
      return (
        <div key="1" className="App">
          <div className="Header">
          <Header name={group+"Dashboard"} />
        </div>
        <div key="2"className="Menu">
          <Menu groups={groups1}/>
        </div>
     
        <div>
            <div className = "Members" >
                <Members addMember={addMember} members = {this.state.members} />
            </div>
        </div>
        <div>
            <div>
              <CreateTask addTask={this.addTask}/>
            </div>
            <div>
              <Grouptasks tasks={this.state.tasks}/>
            </div>
        </div>
      </div>
    );
    }
}
function addMember(name){
      var newperson = {key:name, name: name, score: 0};
      var newmembers = _this.state.members.slice().concat([newperson]);
      _this.setState({
        members: newmembers
      });
  }