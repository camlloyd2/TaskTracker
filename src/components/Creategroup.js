import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
require('../styles/createGroup.css')
var _this;
var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyBIfwtEwz8roKK-rlzzyL0hJw_LhoLfo9k",
    authDomain: "tasktracker-c6e2e.firebaseapp.com",
    databaseURL: "https://tasktracker-c6e2e.firebaseio.com",
    projectId: "tasktracker-c6e2e",
    storageBucket: "tasktracker-c6e2e.appspot.com",
    messagingSenderId: "1071842907632"
  };

var database = firebase.database();

export default class CreateGroup extends Component {
    constructor(){  
        super();
        _this = this;
        this.state=({
            tempGroupName:'',
            GroupName:'',
            tempEmail:'',
            memberEmails: [],
            acceptableEmails: ['email1','email2','email3'],
            members:[],
            acceptableMembers:[]
        });
    this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
    this.handleMemberChange = this.handleMemberChange.bind(this);
    this.handleGroupNameSubmit = this.handleGroupNameSubmit.bind(this);
    this.handleMemberSubmit = this.handleMemberSubmit.bind(this);
    this.handleGroupSubmit = this.handleGroupSubmit.bind(this);
    getEmails();
 }

    handleGroupNameChange(e){
        var state = _this.state;
        state.tempGroupName = e.target.value;
        _this.setState({
            state
        });
    }

    handleGroupNameSubmit(e){
    var state = this.state;
    state.GroupName = state.tempGroupName;
    _this.setState({
        state
    });

}
    handleMemberChange(e){
        var state = _this.state;
        state.tempEmail = e.target.value;
        _this.setState({
            state
        })
    }

    handleMemberSubmit(e){
        var state = this.state;
        var found = state.memberEmails.includes(this.state.tempEmail);
        var acceptable = state.acceptableEmails.includes(this.state.tempEmail);
        if (!found && acceptable){
            state.memberEmails = state.memberEmails.slice().concat([this.state.tempEmail]);
            for(var i=0;i<this.state.acceptableMembers.length;i++){
                console.log(this.state.acceptableMembers[i].email + this.state.tempEmail);
                if(this.state.acceptableMembers[i].email == this.state.tempEmail){
                    state.members = state.members.slice().concat([this.state.acceptableMembers[i]]);
                    break;
                }
            }
        }
        state.tempEmail = '';
        _this.setState({
            state
        });
    }
    handleGroupSubmit(e){
        addGroupDB(this.state.GroupName,this.state.members);
        var state = this.state;
        state.GroupName = '';
        state.memberEmails = [];
        state.tempEmail = '';
        state.tempGroupName = '';
        this.setState(state);
    }
    render() {
        var state = _this.state;
        var membersTable = [];
        for(var i=0;i < state.memberEmails.length;i++){
            membersTable.push(
                <TableRow selectable={false}> 
                    <TableRowColumn>
                        {state.memberEmails[i]} 
                    </TableRowColumn>
                </TableRow>
            )
    }
        return(
            <div className = 'input'>
                <h1 className = "h1"> Create Group </h1>
                <Table>
                    <TableHeader displaySelectAll={false}
              adjustForCheckbox={false} >
                        <TableRow selectable={false}>
                            <TableRowColumn>
                                <TextField hintText = "Enter Group Name" value={this.state.tempGroupName} onChange={this.handleGroupNameChange}/>
                            </TableRowColumn>
                            <TableRowColumn>
                                <FlatButton onClick={this.handleGroupNameSubmit} label="Submit" />
                            </TableRowColumn>
                        </TableRow>
                        <TableRow selectable={false}>
                            <TableRowColumn>
                                <TextField hintText = "Email" value={this.state.tempEmail} onChange={this.handleMemberChange}/>
                            </TableRowColumn>
                            <TableRowColumn>
                                <FlatButton onClick={this.handleMemberSubmit}
                                    label="Submit"  />
                            </TableRowColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow selectable={false}>
                            <TableRowColumn> Member Emails </TableRowColumn>
                            <TableRowColumn> {this.state.GroupName} </TableRowColumn>
                        </TableRow>
                        {membersTable}
                        <TableRow selectable={false}>
                            <TableRowColumn>
                                <FlatButton onClick={this.handleGroupSubmit}
                                    label="Submit"  />
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}
function getEmails(){
     var existingEmails = database.ref('/members/');
    //console.log(existingEmails)
    existingEmails.once('value', function(snapshot){
        //console.log(snapshot.val());
        for(var key in snapshot.val()){
            var member = snapshot.val()[key];
            //console.log(member.email)
            member.key = key;
            var x  = _this.state
            var emails = _this.state.acceptableEmails.slice().concat([member.email]);
            x.acceptableEmails =emails;
            x.acceptableMembers = _this.state.acceptableMembers.slice().concat([member]);
            //console.log(x)
            _this.setState(
                x
            )
        }
  });
}

function addGroupDB(name, members){
    console.log(members)
    var key0 = firebase.database().ref().child('groups').push().key
    firebase.database().ref('/groups/' + key0).set({
        name:name,
        key:key0
    });
    for(var mem in members){
        var member = (members[mem])
        firebase.database().ref('/groups/' + key0+'/members/'+member.key).set({
            key:member.key,
            score:0
        });
        firebase.database().ref('/members/' + member.key+'/groups/'+key0).set({
            key:key0
        });
    }

    
}
