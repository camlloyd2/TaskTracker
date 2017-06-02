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
import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
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
require('../styles/Login.css')

var _this;
export default class Createaccount extends React.Component {
  constructor(){  
          super();
          _this = this;
          this.state=({
             email:'',
             acceptableEmails:[],
          });
      this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      getExistingEmails();
  }

      handleEmailChange(e){
          var state = _this.state;
          state.email = e.target.value;
          _this.setState({
              state
          });
      }


      handleLoginSubmit(e){
        var state = this.state;
        var userEmail = state.email
        console.log(this.state.acceptableEmails)
        var acceptable = (state.acceptableEmails.includes(userEmail));
        if (acceptable){
            console.log('valid')
            //_this.props.updateState() need to set id equal to email's id
        } else {
            window.alert('This email is not a valid email')      
        }
        state.email = '';
        this.setState({
            state
        });
        
      }
      render() {
          return(
              <div className = 'input'>
                  <h1 className = "h1"> Login to TaskTracker </h1>
                  <Table className = 'table'>
                      <TableHeader 
                          displaySelectAll={false}
                          >
                          <TableRow>
                              <TableRowColumn>
                                  <TextField hintText = "Enter Email" value={this.state.email} onChange={this.handleEmailChange}/>
                              </TableRowColumn>
                          </TableRow>
                          <TableRow>
                              <TableRowColumn>
                                  <FlatButton onClick={this.handleLoginSubmit}  
                                      label="Submit"  />
                              </TableRowColumn>
                          </TableRow>
                      </TableHeader>
                  </Table>
                
                  <Link to="/createaccount" className = 'link' >Create account here</Link>
                
              </div>
          )
      }
  }

  function getExistingEmails() {
    var existingEmails = database.ref('/members/');
    existingEmails.once('value', function(snapshot){
        //console.log(snapshot.val());
        for(var mem in snapshot.val()){
            var member = snapshot.val()[mem];
            var x  = _this.state
            var emails = _this.state.acceptableEmails.slice().concat([member.email]);
            x.acceptableEmails = emails;
            console.log(x)
            _this.setState(
                x
            )
        }
  });
}
