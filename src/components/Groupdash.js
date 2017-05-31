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

var fam = {name: "fam"};
var apartment = {name: "apartment"}
var groups1 = [fam,apartment];
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
    group = this.props.match.params.group;
    // task1.group = group;
    // task2.group= group;
    // task3.group=group;
    //var tasks=[task1,task2,task3]
    var state = {
      members:JSON.parse(data.getItem('members')),
      tasks:JSON.parse(data.getItem('tasks'))
    }
    this.state = state

    this.addTask = this.addTask.bind(this);
    this.addMember = this.addMember.bind(this);
  }
    addTask(task){
      console.log("add task reached with "+task)
      var member = "Will";
      var task ={group:group,name:task.name,imp:task.imp,due:task.due,completed:false,member:member}
      var state = this.state;
      state.tasks = state.tasks.slice().concat([task]);
      //console.log("46"+state);
      this.setState(state);
    }
    addMember(name){
      var newperson = {key:name, name: name, score: 0};
      var newmembers = this.state.members.slice().concat([newperson]);
      this.setState({
        members: newmembers
      });
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
          <div className="Header">
          <Header name={group+"Dashboard"} />
          </div>
          <div className="Menu">
          <Menu groups={groups1}/>
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