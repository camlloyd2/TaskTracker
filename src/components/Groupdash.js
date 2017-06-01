import React, { Component } from 'react';
import Header from  './Header';
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

// var task1 = {member:"cam",name:"Take out the trash",imp:"2",due:now,completed:false};
// var task2 = {member:"cam",name:"Dishes",imp:"5",due:now,completed:false};
// var task3 = {member:"will",name:"Vacuuming",imp:"1",due:now,completed:false};

// var members = [{key:'Jack', name: 'Jack', score:7}, {key:'brent',name:'Brent',score:10}, {key:'mike',name: 'Mike', score: -4}]
// data.setItem('tasks',JSON.stringify([task1,task2,task3]));
// data.setItem('members',JSON.stringify(members));

export default class Groupdash extends Component {
  constructor(props){
    super(props);
    _this = this;
    console.log("here is the match"+this.props.match)
    var group = "-KlZK5LaJrjNdH7GuXdb";
    //group = this.props.match.params.group;
    // task1.group = group;
    // task2.group= group;
    // task3.group=group;
    //var tasks=[task1,task2,task3]
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
    this.addTask = this.addTask.bind(this);
    this.addMember = this.addMember.bind(this);
  }
    addTask(task){
      console.log("add task reached with "+task);
      var len = _this.state.members.length;
      var num = Math.floor(Math.random()*len);
      var member = _this.state.members[num].key;
      var task ={group:group,name:task.name,imp:task.imp,due:task.due,completed:false,member:member}
      addTaskDB(task);
      var tasks = this.state.tasks.slice().concat([task]);
      var state = this.state;
      state.tasks = tasks;
      this.setState(state);
    }
    addMember(name){
      var newperson = {name: name, score: 0};
      var members = this.state.members.slice().concat([newperson]);
      var state = this.state;
      state.members = members;
      this.setState(state);
    }
    render() {
      var tasks = this.state.tasks.map((data) => {
            console.log(data.member);
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
        console.log(this.state.tasks[0]);
        var data =this.state.tasks;
        console.log(data);
      return (
        <div className="App">
          <Header name={group+"Dashboard"} />
          <Menu groups={this.state.groups}/>
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

function addTaskDB(task){
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
      key:key1
  });
  var key2 = firebase.database().ref().child('/members/' +task.member+ '/tasks/').push().key
  firebase.database().ref('/members/' +task.member+ '/tasks/'+key2).set({
      key:key2
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
    getMember(member_key);
  }
}

function getMember(key){
  var member = database.ref('/members/'+key);
  member.once('value', function(snapshot){
    var mem = snapshot.val();
    console.log(mem);
    mem.key = key;
    var group = database.ref('/groups/'+group+'/members/'+key);
    group.once('value', function(snapshot){
      var score = snapshot.val().score;
      mem.score = score;
      var members = _this.state.members.slice().concat([mem]);
      var state = _this.state;
      state.members = members;
      _this.setState(state);
    });
  });
}
