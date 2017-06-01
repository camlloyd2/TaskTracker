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
require('../styles/Createaccount.css');

var _this;
export default class Createaccount extends React.Component {
  constructor(){  
          super();
          _this = this;
          this.state=({
             email:'',
             password:''
          });
      this.handleCreateAccountSubmit = this.handleCreateAccountSubmit.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

      handleEmailChange(e){
          var state = _this.state;
          state.email = e.target.value;
          _this.setState({
              state
          });
      }

      handlePasswordChange(e){
      var state = this.state;
      state.password = e.target.value;
      _this.setState({
          state
      });
    }

      handleCreateAccountSubmit(e){
          //need to send state to google firebase
      }
      render() {
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
                          </TableRow>
                          <TableRow>
                              <TableRowColumn>
                                  <TextField hintText = "Enter Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                              </TableRowColumn>
                              <TableRowColumn>
                                  <FlatButton onClick={this.handleCreateAccountSubmit}  
                                      label="Submit"  />
                              </TableRowColumn>
                          </TableRow>
                      </TableHeader>
            
                  </Table>
              </div>
          )
      }
  }