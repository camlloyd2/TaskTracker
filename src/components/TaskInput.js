// ANALAGOUS TO INPUT.JS
import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import DatePicker from 'material-ui/DatePicker';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
require('../styles/TaskInput.css')

injectTapEventPlugin();


var now = new Date();
export default class TaskInput extends Component {
    constructor(){
        super();
        this.state=({
            name:'',
            imp:'',
            due:''

        });
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDueByChange = this.handleDueByChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleNameChange(e){
        var state = this.state;
        state.name = e.target.value;
        this.setState(
            state
    );

    }
    handleRatingChange(e){
        var state = this.state
        state.imp = e.target.value;
        this.setState(
            state
        );
    }
    handleDueByChange = (e, date) => {
        var state = this.state
        state.due = date;
        this.setState(
            state
            );
    }
    handleSubmit(){
        console.log("handlesubmit reached");
        this.props.addTask(this.state)
        this.setState({
            name:'',
            imp:'',
            due:''
        })
    }

    render() {
        return (
            <Table>
                <TableHeader displaySelectAll={false}
            adjustForCheckbox={false}>
                <TableRow>
                    <TableRowColumn>
                        <TextField hintText = "Task Name" value={this.state.name} onChange={this.handleNameChange}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <TextField type="number" min="1" max="5" hintText= "Task Rating (1-5)" value={this.state.imp} onChange={this.handleRatingChange}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <DatePicker defaultDate={now} 
                            hintText="Choose a due by date" 
                            value={this.state.due} 
                            onChange = {this.handleDueByChange}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton onClick={this.handleSubmit}  label="Submit"  />
                    </TableRowColumn>
                </TableRow>
                </TableHeader>
            </Table>
        )
    
    }
}