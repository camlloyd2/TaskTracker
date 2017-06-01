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


export default class CreateGroup extends Component {
    constructor(){  
        super();
        _this = this;
        this.state=({
            tempGroupName:'',
            GroupName:'',
            tempEmail:'',
            memberEmails: []
        });
    this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
    this.handleMemberChange = this.handleMemberChange.bind(this);
    this.handleGroupNameSubmit = this.handleGroupNameSubmit.bind(this);
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
        var state = _this.state;
        var stringTempEmail = state.tempEmail.toString();
        var found = state.memberEmails.includes(stringTempEmail);
        if (!found){
            state.memberEmails = state.memberEmails.slice().concat([state.tempEmail]);
        }
        state.tempEmail = '';
        _this.setState({
            state
        });
    }

    render() {
        var state = _this.state;
        var membersTable = [];
        for(var i=0;i < state.memberEmails.length;i++){
            membersTable.push(
                <TableRow> 
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
                    <TableHeader 
                        displaySelectAll={false}
                        >
                        <TableRow>
                            <TableRowColumn>
                                <TextField hintText = "Enter Group Name" value={this.state.tempGroupName} onChange={this.handleGroupNameChange}/>
                            </TableRowColumn>
                            <TableRowColumn>
                                <FlatButton onClick={this.handleGroupNameSubmit} label="Submit" />
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>
                                <TextField hintText = "Email" value={this.state.tempEmail} onChange={this.handleMemberChange}/>
                            </TableRowColumn>
                            <TableRowColumn>
                                <FlatButton onClick={this.handleMemberSubmit}  
                                    label="Submit"  />
                            </TableRowColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableRowColumn> Member Emails </TableRowColumn>
                            <TableRowColumn> {this.state.GroupName} </TableRowColumn>
                        </TableRow>
                        {membersTable}
                    </TableBody>
                </Table>
            </div>
        )
    }
}
