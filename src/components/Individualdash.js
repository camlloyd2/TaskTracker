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
          <Header name="My DashBoard" />
          <Menu groups={this.state.groups}/>
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
  var tasks =[];
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



function initDatabase(){
//   var key0 = firebase.database().ref().child('members').push().key
//   firebase.database().ref('/members/' + key0).set({
//     name: "Will",
//     email:"wjd6ca@virginia.eduu"
// });
// var key1 = firebase.database().ref().child('members').push().key
//   firebase.database().ref('/members/' + key1).set({
//     name: "Cam",
//     email:"cam@virginia.eduu"
// });
// var key2 = firebase.database().ref().child('members').push().key
//   firebase.database().ref('/members/' + key2).set({
//     name: "Brent",
//     email:"brent@portalanalytics.code"
// });
// var key3 = firebase.database().ref().child('groups').push().key
//   firebase.database().ref('/groups/' + key3).set({
//     name: "launch"
// });
// var key4 = firebase.database().ref().child('tasks').push().key
//   firebase.database().ref('/tasks/' + key4).set({
//     group: key3,
//     member: key1,
//     due:"June 1st",
//     imp:4,
//     completed:false,
//dont forget name
// });
// var key5 = firebase.database().ref().child('tasks').push().key
//   firebase.database().ref('/tasks/' + key5).set({
//     group: key3,
//     member: key0,
//     due:"June 3",
//     imp:2,
//     completed:false,
//     name:"trash"
// });
// var key6 = firebase.database().ref().child('tasks').push().key
//   firebase.database().ref('/tasks/' + key6).set({
//     group: key3,
//     member: key0,
//     due:"June 5",
//     imp:1,
//     completed:false,
// });
// var key7 = firebase.database().ref().child('/members/' + key0+ '/tasks/').push().key
//   firebase.database().ref('/members/' + key0+ '/tasks/'+key7).set({
//       key:key5
//   });
// var key8 = firebase.database().ref().child('/members/' + key0+ '/tasks/').push().key
//   firebase.database().ref('/members/' + key0+ '/tasks/'+key8).set({
//       key:key6
//   });
// var key9 = firebase.database().ref().child('/members/' + key1+ '/tasks/').push().key
//   firebase.database().ref('/members/' + key1+ '/tasks/'+key9).set({
//       key:key4
//   });
//   var key10 = firebase.database().ref().child('/members/' + key0+ '/groups/').push().key
//   firebase.database().ref('/members/' + key0+ '/groups/'+key10).set({
//       key:key3
//   });
//   var key11 = firebase.database().ref().child('/members/' + key1+ '/groups/').push().key
//   firebase.database().ref('/members/' + key1+ '/groups/'+key11).set({
//       key:key3
//   });
//   var key12 = firebase.database().ref().child('/groups/' + key3+ '/members/').push().key
//   firebase.database().ref('/groups/' + key3+ '/members/'+key12).set({
//       key:key0,
//       score:0
//   });
//   var key13 = firebase.database().ref().child('/groups/' + key3+ '/members/').push().key
//   firebase.database().ref('/groups/' + key3+ '/members/'+key13).set({
//       key:key1,
//   });
//   var key14 = firebase.database().ref().child('/groups/' + key3+ '/tasks/').push().key
//   firebase.database().ref('/groups/' + key3+ '/tasks/'+key14).set({
//       key:key4
//   });
//   var key15 = firebase.database().ref().child('/groups/' + key3+ '/tasks/').push().key
//   firebase.database().ref('/groups/' + key3+ '/tasks/'+key15).set({
//       key:key5
//   });
//   var key16 = firebase.database().ref().child('/groups/' + key3+ '/tasks/').push().key
//   firebase.database().ref('/groups/' + key3+ '/tasks/'+key16).set({
//       key:key6
//   });

}
