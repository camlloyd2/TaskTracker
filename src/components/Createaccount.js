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
             name:'',
             unacceptableEmails:['unacceptable1']
          });
      this.handleEmailChange = this.handleEmailChange.bind(this);
  }

      handleEmailChange(e){
          var state = _this.state;
          state.email = e.target.value;
          _this.setState({
              state
          });
      }
      handleNameChange(e){
          var state = _this.state;
          state.name = e.target.value;
          _this.setState({
              state
          });
      }

    handleNewUserSubmit(e){
        var state = _this.state;
        var userEmail = state.email.toString();
        var acceptable = !(state.unacceptableEmails.includes(userEmail));
        if (acceptable){
            // send to firebase
            //redirect to home 
        } else {
            console.log('not acceptable')
            
        }
        state.email = '';
        state.name = '';
        _this.setState({
            state
        });
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