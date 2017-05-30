import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
export default class SingleTask extends React.Component {

    render(){
        console.log(this.props)
        return(
            <MuiThemeProvider>
            <TableRow>
                <TableRowColumn>{this.props.task.group}</TableRowColumn>
                <TableRowColumn>{this.props.task.name}</TableRowColumn>
                {/*<TableRowColumn>{this.props.tasks.imp}</TableRowColumn>
                <TableRowColumn>{this.props.tasks.due}</TableRowColumn>
                <TableRowColumn><button onClick={() => this.props.confirmComplete(this.props.ii)}>Complete!</button></TableRowColumn>*/}
            </TableRow>
            </MuiThemeProvider>
        );
    }
}