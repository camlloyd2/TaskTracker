import React from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
export default class SingleTask extends React.Component {

    render(){
        console.log(this.props)
        return(
            <TableRow>
                <TableRowColumn>{this.props.task.group.name}</TableRowColumn>
                <TableRowColumn>{this.props.task.name}</TableRowColumn>
                <TableRowColumn>{this.props.task.imp}</TableRowColumn>
                <TableRowColumn>{this.props.task.due}</TableRowColumn>
                <TableRowColumn><button onClick={() => this.props.confirmComplete(this.props.ii)}>Complete!</button></TableRowColumn>
            </TableRow>
        );
    }
}