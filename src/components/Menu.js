import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
require("../styles/Menu.css");

export default class Menu extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        var groups =[];
        for (var i=0;i<this.props.groups.length;i++){
            var key=2+i;
            var link = '/groups/'+this.props.groups[i].name
            groups.push(
            <TableRowColumn>
                <Link to = {link}>
                    <FlatButton className="menubutton" key={key}>{this.props.groups[i].name}</FlatButton>
                </Link>
            </TableRowColumn>)
        }
        return (
            <Table className = 'menu'>
                <TableHeader>
                    <TableRow>
                        <TableRowColumn>
                            <Link to="/"><FlatButton className="menubutton" key="1">My Tasks</FlatButton></Link>
                        </TableRowColumn>
                        <TableRowColumn>
                            <Link to="/creategroup"><FlatButton className="menubutton" key="2" >Create Group</FlatButton></Link>
                        </TableRowColumn>
                        {groups}
                    </TableRow>
                </TableHeader>
            </Table>
                        
        );
    }
}