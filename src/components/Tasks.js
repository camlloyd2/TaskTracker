import React from 'react';
import star from '../images/star.gif';
import SingleTask from  './SingleTask';
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
            <div>
            <Table className="taskTable">
                <TableHeader>
                    <TableRow >
                        <TableHeaderColumn>Group</TableHeaderColumn>
                        <TableHeaderColumn>Task Name</TableHeaderColumn>
                        <TableHeaderColumn>Importance</TableHeaderColumn>
                        <TableHeaderColumn>Due on</TableHeaderColumn>
                        <TableHeaderColumn><img className="completeStar" src={star} /></TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/*<TableRow>
                        <TableRowColumn>this.props.task.group</TableRowColumn>
                        <TableRowColumn>this.props.task.name</TableRowColumn>
                        <TableRowColumn>this.props.tasks.imp</TableRowColumn>
                        <TableRowColumn>this.props.tasks.due</TableRowColumn>
                        <TableRowColumn><button onClick={() => this.props.confirmComplete(0)}>Complete!</button></TableRowColumn>
                    </TableRow>*/}
                    {tasks}
                </TableBody>
            </Table>
            </div>
        );
    }
}
