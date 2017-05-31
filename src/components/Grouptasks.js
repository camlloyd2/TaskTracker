//ANALAGOUS TO APP.JS
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TaskInput from './TaskInput.js';
import GroupTaskTable from './GroupTaskTable.js';


var key = 0;
var _this;
export default class GroupTasks extends Component {
  constructor() {
      super();
      _this = this;
      this.state = {
        tasks:[]
      };
  }
  addTask(data){
    var task = {
      member_name:data.member_name,
      task_name:data.task_name,
      rating:data.rating,
      due_by:data.due_by,
      completed:false,
      key:key
    }
    key +=1;
    var tasks = _this.state.tasks.slice().concat([task]);
    _this.setState({
      tasks:tasks
    });
  }

  render() {
      console.log("render grouptasks");
    return (
      <div className="GroupTasks">
        <div>
            <MuiThemeProvider>
                <TaskInput addTask={this.addTask}/>
            </MuiThemeProvider>

            <MuiThemeProvider>
                <GroupTaskTable tasks={this.props.tasks}/>
            </MuiThemeProvider>
        </div>
      </div>
    )
  }
}

