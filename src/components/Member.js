import React from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class Member extends React.Component {
    render(){
        return(
        <TableRow selectable={false}>
            <TableRowColumn >{this.props.member.name}</TableRowColumn>
            <TableRowColumn>{this.props.member.score}</TableRowColumn>
         </TableRow>
        );
    }
}