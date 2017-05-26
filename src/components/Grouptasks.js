import React from 'react';
import SingleTaskGroup from './SingleTaskGroup';
import {Table,TableRow, TableRowColumn, TableHeader, TableHeaderColumn, TableBody, TableFooter} from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Grouptasks extends React.Component {
    render() {
        console.log("here are the taske"+this.props.tasks); 
        var tasks = [];
        for (var i = 0; i < this.props.tasks.length; i++) {
            console.log(this.props.tasks[i].member);
            tasks.push(
                <SingleTaskGroup ii = {i} task={this.props.tasks[i]} />
            );       
        }
        return(
            <div>react sucks</div>
            /*<div>
            <MuiThemeProvider>
                <Table>
                    <TableHeader>
                        <TableHeaderColumn>hello</TableHeaderColumn>
                    </TableHeader>
                </Table>
            </MuiThemeProvider>
            </div>*/
            /*<table className="TaskTableGroup">
                <tr key="1">
                    <th key="1.1">Name</th>
                    <th key="1.2">Task</th>
                    <th key="1.3">Importance</th>
                    <th key="1.4">Due By</th>
                    <th key="1.5">Completed</th>
                </tr>

                {this.props.tasks.map((task,i) => {
                        <tr>
                            <td>{task.member}</td>
                            <td>{task.name}</td>
                            <td>{task.imp}</td>
                            <td>{task.due}</td>
                            <td>{task.completed}</td>
                            </tr>})}
                    {tasks}
            </table>*/
          
        );
    }
}