import React from 'react';
import { Form, Text } from 'react-form';
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
import { Redirect } from 'react-router';
require('../styles/Createaccount.css');

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

export default class Createaccount extends React.Component {
  constructor(){  
          super();
          _this = this;
          this.state=({
             email:'',
             name:'',
             unacceptableEmails: [],
          });
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleNewUserSubmit = this.handleNewUserSubmit.bind(this);
      getExistingEmails();
  }
      handleEmailChange(e){
          var state = this.state;
          state.email = e.target.value;
          this.setState(state);
      }
      handleNameChange(e){
          var state = this.state;
          state.name = e.target.value;
          this.setState( state);
      }

    handleNewUserSubmit(e){
        var state = this.state;
        var userEmail = state.email.toString();
        console.log(this.state)
        var acceptable = !(state.unacceptableEmails.includes(userEmail));
        if (acceptable){
            updateMembersDB(this.state)
            state.unacceptableEmails.slice().concat([userEmail]);
        } else {
            window.alert('This email is not a valid email')      
        }
        state.email = '';
        state.name = '';
        this.setState({
            state
        });
    }
      render() {
          if(!(this.props.id == null)){
              return (<Redirect to="/" />)
          }
          else{
            return(
              <div className = 'input'>
                  <h1 className = "h1"> Create Account </h1>
                  <Table>
                      <TableHeader 
                          displaySelectAll={false}
                          >
                          <TableRow>
                              <TableRowColumn>
                                  <TextField hintText = "Enter Email" value={this.state.email} onChange={this.handleEmailChange}/>
                              </TableRowColumn>
                              <TableRowColumn>
                                  <TextField hintText = "Enter Name" value={this.state.name} onChange={this.handleNameChange}/>
                              </TableRowColumn>
                              <TableRowColumn>
                                  <FlatButton onClick={this.handleNewUserSubmit}  
                                      label="Submit"  />
                              </TableRowColumn>
                        </TableRow>
                      </TableHeader>
            
                  </Table>
              </div>
          )
          }
      }
  }

  function updateMembersDB(newmember, id) { //id should be generated where function is called?
       var key0 = firebase.database().ref().child('/members/').push().key
            firebase.database().ref('/members/' + key0).set({
            key:key0,
            name: newmember.name,
            email:newmember.email
  });
}

function getExistingEmails() {
    var existingEmails = database.ref('/members/');
    //console.log(existingEmails)
    existingEmails.once('value', function(snapshot){
        console.log(snapshot.val());
        for(var mem in snapshot.val()){
            var member = snapshot.val()[mem];
            console.log(member.email)
            var x  = _this.state
            var emails = _this.state.unacceptableEmails.slice().concat([member.email]);
            x.unacceptableEmails =emails;
            console.log(x)
            _this.setState(
                x
            )
        }
  });
}