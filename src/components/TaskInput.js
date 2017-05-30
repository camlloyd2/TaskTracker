// ANALAGOUS TO INPUT.JS
import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import DatePicker from 'material-ui/DatePicker';
require('../styles/TaskInput.css')

injectTapEventPlugin();

var _this;
var now = new Date();
export default class TaskInput extends Component {
    constructor(){
        super();
        _this = this;
        this.state=({
            member_name:'',
            task_name:'',
            rating:'',
            due_by:'',
            completed:'',

        });
    }
    handleMemberNameChange(e){
        var state = _this.state;
        state.member_name = e.target.value;
        _this.setState({
            state
        });
    }

    handleTaskNameChange(e){
        var state = _this.state;
        state.task_name = e.target.value;
        _this.setState({
            state
    });

    }
    handleRatingChange(e){
        var state = _this.state
        state.rating = e.target.value;
        _this.setState({
            state
        });
    }
    handleDueByChange = (e, date) => {
        var state = _this.state
        state.due_by = date;
        console.log(state.due_by)
        _this.setState({
            state
        });
    }

    render() {
        return (
            <div className = 'input'>
                <MuiThemeProvider>
                    <TextField hintText = "Task Name" value={this.state.name} onChange={this.handleNameChange}/>
                </MuiThemeProvider>

                <MuiThemeProvider>
                    <TextField hintText= "Task Rating (1-5)" value={this.state.rating} onChange={this.handleRatingChange}/>
                </MuiThemeProvider>

               <label>
                    <p>Due By:</p>
                    <MuiThemeProvider>
                        <DatePicker defaultDate={now} 
                        hintText="Choose a due by date" 
                        value={this.state.due_by} 
                        onChange = {this.handleDueByChange}
      />
                    </MuiThemeProvider>
                </label>

                <MuiThemeProvider>
                    <FlatButton onClick={this.handleSubmit}  
                        label="Submit"  />
                </MuiThemeProvider>
            </div>

        )

    }
}