// ANALAGOUS TO TABLE.JS
import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SingleTask from './SingleTaskGroup.js';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


export default class GroupTaskTable extends Component {
    constructor(props){
        super(props);
    }
    render(){
        var tasks = [];
        // console.log(this.props.tasks.length)
        // for(var i=0;i < this.props.tasks.length;i++){
        //     console.log("addrow"+i);
        //     tasks.push(
        //         <SingleTask data={this.props.tasks[i]}/>
        //     )
        // }
        return(
            <MuiThemeProvider>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Who's Responsible</TableHeaderColumn>
                            <TableHeaderColumn>Task Name</TableHeaderColumn>
                            <TableHeaderColumn>Task Rating</TableHeaderColumn>
                            <TableHeaderColumn>Due By: </TableHeaderColumn>
                            <TableHeaderColumn>Completed? </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks}
                    </TableBody>
                </Table>
            </MuiThemeProvider>
        );
    }
}