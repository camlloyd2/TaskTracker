import React, { Component } from 'react';
//import Header from  './Header';
import Menu from  './Menu';
import Members from './Members';
import Time from 'react-time';
import DatePicker from 'material-ui/DatePicker';
import TaskInput from './TaskInput.js';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
require("../styles/datetime.css");
require("../styles/GroupDash.css");
var data = localStorage;
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBIfwtEwz8roKK-rlzzyL0hJw_LhoLfo9k",
    authDomain: "tasktracker-c6e2e.firebaseapp.com",
    databaseURL: "https://tasktracker-c6e2e.firebaseio.com",
    projectId: "tasktracker-c6e2e",
    storageBucket: "tasktracker-c6e2e.appspot.com",
    messagingSenderId: "1071842907632"
  };

//firebase.initializeApp(config);
var database = firebase.database();

var _this;
var group;
var now = new Date();

export default class Groupdash extends Component {
  constructor(props){
    super(props);
    _this = this;
    var group = "-KlZK5LaJrjNdH7GuXdb";
    //console.log("here is the match"+this.props.match)
    var state = {
      members:[],
      tasks:[],
      groups:[],
      allmembers:[]
    }
    this.state = state
    getGroups(this.props.id);
    getTasks(group);
    getMembers(group);
    getAllMembers();
    this.addTask = this.addTask.bind(this);
    this.addMember = this.addMember.bind(this);
  }
    addTask(task){
      //console.log("add task reached with "+task);
      var len = this.state.members.length;
      var num = Math.floor(Math.random()*len);
      var member = this.state.members[num].key;
      var group = "-KlZK5LaJrjNdH7GuXdb";
      var task ={group:group,name:task.name,imp:task.imp,due:task.due.toString(),completed:false,member:member}
      addTaskDB(task);
      task.member = this.state.members[num].name;
      var tasks = this.state.tasks.slice().concat([task]);
      var state = this.state;
      state.tasks = tasks;
      this.setState(state);
    }
    addMember(email){
      var newperson = {name:"", score: 0};
      var found = false;
      var acceptable=false;
      var member;
      //console.log(this.state.allmembers)
      for(var i=0; i<this.state.allmembers.length;i++){
        //console.log(email + this.state.allmembers[i].email)
        if(email == this.state.allmembers[i].email){
          acceptable=true;
          member = this.state.allmembers[i];
          member.score = 0;
          break;
        }
      }
      for(var i=0;i<this.state.members.length;i++){
        if(email == this.state.members[i].email){
          found=true;
          break;
        }
      }
      //console.log(found);
      //console.log(acceptable);
      if (!found && acceptable){
        var members = this.state.members.slice().concat([member]);
        var state = this.state;
        state.members = members;
        this.setState(state);
        //console.log("what is going on")
        //console.log(member);
        addMemberGroupDB(member);
      }

    }
    render() {
      console.log(this.props);
      var tasks = this.state.tasks.map((data) => {
            //console.log(data.member);
            var x = data.member;
            return (
                <TableRow>
                    <TableRowColumn>{data.member}</TableRowColumn>
                    <TableRowColumn>{data.name}</TableRowColumn>
                    <TableRowColumn>{data.imp} </TableRowColumn>
                    <TableRowColumn>{data.due}</TableRowColumn>
                    <TableRowColumn>{data.completed.toString()}</TableRowColumn>
                </TableRow>
            )
        })
        //console.log(this.state.tasks[0]);
        var data =this.state.tasks;
        //console.log(data);
      return (
        <div className="App">

          {/*<div className="Header">
          <Header name={" Dashboard"} />
          </div>*/}
          <div className="Menu">
          <Menu groupid={group}groups={this.state.groups}/>
          </div>
          <Members addMember={this.addMember} members = {this.state.members} />
          <div className = "groupstuff">
            <TaskInput addTask={this.addTask}/>
            <Table>
                <TableHeader displaySelectAll={false}
              adjustForCheckbox={false}>
                    <TableRow selectable={false}>
                        <TableHeaderColumn>Who's Responsible</TableHeaderColumn>
                        <TableHeaderColumn>Task Name</TableHeaderColumn>
                        <TableHeaderColumn>Task Rating</TableHeaderColumn>
                        <TableHeaderColumn>Due By: </TableHeaderColumn>
                        <TableHeaderColumn>Completed? </TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {tasks}
                  </TableBody>
            </Table>
          </div>
      </div>
    );
    }
}
function addMemberGroupDB(member){
  //console.log("here i am")
  //console.log(member);
  var group = "-KlZK5LaJrjNdH7GuXdb";
  var key1 = firebase.database().ref().child('/groups/' +"-KlZK5LaJrjNdH7GuXdb"+ '/members/').push().key
  firebase.database().ref('/groups/' + group+ '/members/'+key1).set({
      key:member.key,
      score:0
  });
  var key2 = firebase.database().ref().child('/members/' +member.key+ '/groups/').push().key
  firebase.database().ref('/members/' + member.key+ '/groups/'+key2).set({
      key:group
  });
}
function addTaskDB(task){
  //console.log(task);
  var key = firebase.database().ref().child('tasks').push().key
  firebase.database().ref('/tasks/' + key).set({
    group: task.group,
    member:task.member,
    due:task.due,
    imp:task.imp,
    completed:false,
    name:task.name
  });
  var key1 = firebase.database().ref().child('/groups/' +task.group+ '/tasks/').push().key
  firebase.database().ref('/groups/' + task.group+ '/tasks/'+key1).set({
      key:key
  });
  var key2 = firebase.database().ref().child('/members/' +task.member+ '/tasks/').push().key
  firebase.database().ref('/members/' +task.member+ '/tasks/'+key2).set({
      key:key
  });
}

function addMemberDB(member,group){
  var key = firebase.database().ref().child('/groups/' +group+ '/members/').push().key
  firebase.database().ref('/groups/' + group+ '/members/'+key).set({
      key:member,
      score:0
  });
  var key1 = firebase.database().ref().child('/members/' +member+ '/groups/').push().key
  firebase.database().ref('/members/' +member+ '/groups/'+group).set({
      key:key
  });
}

function getGroups(id){
  var groups = database.ref('/members/'+ id+ '/groups/');
    groups.once('value', function(snapshot){
      getGroupsInfo(snapshot.val());
  });
}
function getGroupsInfo(data){
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
    var state = _this.state;
    state.groups =groups
    _this.setState(state);
  });
}

function getTasks(id){
  var tasks = database.ref('/groups/'+ id+ '/tasks/');
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
          var state = _this.state;
          state.tasks = tasks;
          _this.setState(state);
        });
      })
    });
}
function getMembers(id){
  var tasks = database.ref('/groups/'+ id+ '/members/');
    tasks.once('value', function(snapshot){
      getMemberInfo(snapshot.val());
  });
}

function getMemberInfo(data){
  for(var key in data){
    var member_key = data[key].key;
    getMember(member_key, data[key].score);
  }
}

function getMember(key, score){
  //console.log(key);
  var member = database.ref('/members/'+key);
  member.once('value', function(snapshot){
    var mem = snapshot.val();
    //console.log(mem);
    mem.key = key;
      mem.score=score;
      var members = _this.state.members.slice().concat([mem]);
      var state = _this.state;
      state.members = members;
      _this.setState(state);
    });
}

function getAllMembers(){
  var members = database.ref('/members/');
    members.once('value', function(snapshot){
      getAllMembersInfo(snapshot.val());
  });
}
function getAllMembersInfo(data){
  //console.log(data);
  for(var key in data){
    var mem = data[key];
    mem.key = key;
    var members = _this.state.allmembers.slice().concat([mem]);
    var state = _this.state;
    state.allmembers =members;
    _this.setState(state);
  }
}