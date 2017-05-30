import React from 'react';
import star from '../images/star.gif';
import SingleTask from  './SingleTask';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
require("../styles/Tasks.css");

export default class Tasks extends React.Component {
    render(){
        var tasks = [];
        console.log(this.props.tasks);
        for(var i=0;i<this.props.tasks.length;i++){
            if(this.props.tasks[i].completed == false){
                tasks.push(
                    <SingleTask task={this.props.tasks[i]} confirmComplete={this.props.confirmComplete}/>
            );
            }
        }
        return (
            <MuiThemeProvider>
                <Table className="taskTable">
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Group</TableHeaderColumn>
                            <TableHeaderColumn>Task Name</TableHeaderColumn>
                            <TableHeaderColumn>Importance</TableHeaderColumn>
                            <TableHeaderColumn>Due on</TableHeaderColumn>
                            <TableHeaderColumn><img className="completeStar" src={star} /></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {/*{tasks}*/}
                    </TableBody>
                </Table>
            </MuiThemeProvider>
        );
    }
}
