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
require('../styles/Login.css')

var _this;
export default class Createaccount extends React.Component {
  constructor(){  
          super();
          _this = this;
          this.state=({
             email:'',
          });
      this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
  }

      handleEmailChange(e){
          var state = _this.state;
          state.email = e.target.value;
          _this.setState({
              state
          });
      }


      handleLoginSubmit(e){
          //if ('email is valid') {
            var loggedIn = true
            //get user ID
            updateId()
          //}
        
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