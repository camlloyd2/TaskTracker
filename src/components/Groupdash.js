import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../styles/Individualdash.css';
import Header from  './Header';
import Menu from  './Menu';
import Members from './Members';
require("../styles/datetime.css");
//var PropTypes = require('prop-types');

var fam = {name: "fam"};
var apartment = {name: "apartment"}
var groups1 = [fam,apartment];
var _this;

var task1 = {group:"fam",name:"Take out the trash",imp:"2",due:"5/15/2017",completed:false};
var task2 = {group:"apartment",name:"Dishes",imp:"5",due:"5/30/2017",completed:false};
var task3 = {group:"dev team",name:"Vacuuming",imp:"1",due:"5/21/2017",completed:false};

var members = [{name: 'Jack', score:7}, {name:'Brent',score:10}, {name: 'Mike', score: -4}]

export default class Groupdash extends Component {
  constructor(props){
    super(props);
    _this = this;
    this.state = {
      members: members
    }
  }
 addMember(name){
      var newperson = {name: name, score: 0};
      console.log(newperson);
      var newmembers = this.state.members.push(newperson)
      console.log("newmembers"+newperson);
      this.setState({
        members:newmembers
      });
  }

    render() {
        console.log("groupdash"+this.state.members);
      return (
        <div key="1" className="App">
          <div className="Header">
          <Header name="My DashBoard" />
        </div>
        <div key="2"className="Menu">
          <Menu groups={groups1}/>
        </div>
     
        <div>
            <div className = "Members" >
                <Members addMember={this.addMember} members = {members} />
            </div>
        </div>
      </div>
    );
    }
}
