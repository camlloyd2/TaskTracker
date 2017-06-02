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
var _this;

export default class CreateGroup extends Component {
    constructor(){  
        super();
        _this = this;
        this.state=({
            tempGroupName:'',
            GroupName:'',
            tempEmail:'',
            memberEmails: [],
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
    this.setState({
        state
    });

}
    handleMemberChange(e){
        var state = this.state;
        state.tempEmail = e.target.value;
        this.setState({
            state
        })
    }

    handleMemberSubmit(e){
        var state = this.state;
        var stringTempEmail = this.state.tempEmail.toString();
        var found = state.memberEmails.includes(stringTempEmail);
        for(var mem in this.state.acceptableMembers){
            if(mem.email == str)
        }
        var acceptable = state.acceptableEmails.includes(stringTempEmail);
        if (!found && acceptable){
            state.memberEmails = state.memberEmails.slice().concat([state.tempEmail]);
        }
        state.tempEmail = '';
        this.setState({
            state
        });
    }
    handleGroupSubmit(e){
        addGroupDB(this.state.GroupName,this.state.memberEmails);
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
        for(var mem in snapshot.val()){
            var member = snapshot.val()[mem];
            //console.log(member.email)
            var x  = _this.state
            var emails = _this.state.acceptableEmails.slice().concat([member.email]);
            x.acceptableEmails =emails;
            //console.log(x)
            _this.setState(
                x
            )
        }
  });
}

function addGroupDB(name, emails){
    var key0 = firebase.database().ref().child('groups').push().key
    firebase.database().ref('/groups/' + key0).set({
        name:name
    });
    
}
