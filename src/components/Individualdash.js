import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../styles/Individualdash.css';
// import Header from  './Header';
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
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBIfwtEwz8roKK-rlzzyL0hJw_LhoLfo9k",
    authDomain: "tasktracker-c6e2e.firebaseapp.com",
    databaseURL: "https://tasktracker-c6e2e.firebaseio.com",
    projectId: "tasktracker-c6e2e",
    storageBucket: "tasktracker-c6e2e.appspot.com",
    messagingSenderId: "1071842907632"
  };

firebase.initializeApp(config);
var database = firebase.database();
var data = localStorage;
var _this;
var groups;

export default class Individualdash extends Component {
  constructor(props){
    super(props);
    _this = this; 
    var state = {tasks:[],groups:[]};
    this.state = state;
    this.confirmComplete = this.confirmComplete.bind(this);
    getTasks(this.props.id);
    getGroups(this.props.id);
    //initDatabase();
  }

    confirmComplete(key){
      var bool = window.confirm("Are you sure you have completed this task?");
      if(bool){
        this.state.tasks[key].completed =true;
        updateCompletedDB(this.state.tasks[key]);
        updateScoreDB(this.state.tasks[key]);
        this.setState({
          groups:this.state.groups,
          tasks: this.state.tasks
        });
      }
    }
    render() {  
      var tasks = this.state.tasks.map((data,i) => {
        //console.log(data);
        return (
          <TableRow hidden={data.completed}>
                <TableRowColumn>{data.group}</TableRowColumn>
                <TableRowColumn>{data.name}</TableRowColumn>
                <TableRowColumn>{data.imp}</TableRowColumn>
                <TableRowColumn>{data.due}</TableRowColumn>
                <TableRowColumn><button onClick={() => this.confirmComplete(i)}>Complete!</button></TableRowColumn>
            </TableRow>
        )
      })
      return (
        
        <div className="App">
          {/*<Header name="My DashBoard" />*/}
          <Menu idash={true}groups={this.state.groups}/>
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

function updateScoreDB(task){
  //console.log(task.group_key);
  var members = database.ref('/groups/' + task.group_key+'/members/');
    members.once('value',function(snapshot){
      getMembersInfo(snapshot.val(), task);
    });
}
function getMembersInfo(data, task){
  //console.log("step 2")
  var imp = parseInt(task.imp);
  for(var key in data){
    if(data[key].key == task.member_key){
      //console.log("we found the match");
      updateMemberScore1(key, task.group_key, task.member_key,imp)
    }
  }
}
function updateMemberScore1(key, group, member,imp){
  var score = database.ref('/groups/' + group+'/members/'+key);
    score.once('value',function(snapshot){
      //console.log(snapshot.val().score)
      updateMemberScore2(key, group, member, snapshot.val().score,imp);
    });
}
function updateMemberScore2(key, group, member, score,imp){
  //console.log(key+group+member+score);
  firebase.database().ref('/groups/' +group+'/members/'+key).set({
    key:member,
    score:score+imp
  });
}
function updateCompletedDB(task){
  firebase.database().ref('/tasks/' + task.key).set({
    group: task.group_key,
    member: task.member_key,
    due:task.due,
    imp:task.imp,
    completed:true,
    name:task.name
  });
}

function getTasks(id){
  var tasks = database.ref('/members/'+ id+ '/tasks/');
    tasks.once('value', function(snapshot){
      getTasksInfo(snapshot.val());
  });
}

function getTasksInfo(data){
  for(var key in data){
    var task_key = data[key].key;
    getTask(task_key);
  }
}

function getTask(key){
  var task = database.ref('/tasks/'+key);
  task.once('value', function(snapshot){
      var task = snapshot.val();
      task.group_key = task.group;
      task.member_key = task.member;
      task.key = key;
      var group = database.ref('/groups/'+snapshot.val().group);
      group.once('value', function(snapshot){
        task.group = snapshot.val().name;
        var member = database.ref('/members/'+task.member);
        member.once('value', function(snapshot){
          task.member = snapshot.val().name;
          var tasks = _this.state.tasks.slice().concat([task]);
          _this.setState({
            groups:_this.state.groups,
            tasks:tasks
           });
        });
      })
    });
}

function getGroups(id){
  var groups = database.ref('/members/'+ id+ '/groups/');
    groups.once('value', function(snapshot){
      getGroupsInfo(snapshot.val());
  });
}

function getGroupsInfo(data){
  var groups =[];
  for(var key in data){
    var group_key = data[key].key;
    getGroup(group_key);
  }
  
}
function getGroup(key){
  var group = database.ref('/groups/'+key);
  group.once('value', function(snapshot){
    var grp = snapshot.val();
    grp.key = key;
    var groups = _this.state.groups.slice().concat([grp]);
    _this.setState({
      groups:groups,
      tasks:_this.state.tasks
    });
  });
}

