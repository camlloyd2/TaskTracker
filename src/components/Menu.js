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
import RaisedButton from 'material-ui/RaisedButton';
import clipboard from '../images/clipboard.png';
import Time from 'react-time';
require("../styles/Menu.css");

export default class Menu extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        var title = null;
        let now= new Date();
        if(this.props.idash){
            title= "My DashBoard";
        }
        else{
            for(var i=0;i<this.props.groups.length;i++){
                if(this.props.groups[i].key == this.props.groupid){
                    title= this.props.groups[i].name.toString();
                    break;
                }
            }
            if(title == null){
                title="error page not found";
            }
        }
        var groups =[];
        for (var i=0;i<this.props.groups.length;i++){
            var key=2+i;
            var link = '/groups/'+this.props.groups[i].key
            groups.push(
            <TableRowColumn>
                <Link to = {link}>
                    <RaisedButton key={key}>{this.props.groups[i].name}</RaisedButton>
                </Link>
            </TableRowColumn>)
        }
        return (
            <div>
            <div className="Header" >
                    <div key="1" className="headerLeft">
                        <h1> Task Tracker </h1>
                        <img className="clipboard" src={clipboard} />
                    </div>
                    <div key="2" className="headerRight">
                        <Time className="headertime"value={now} format="MM/DD/YYYY" />
                         <h2> {title} </h2>
                   </div>
                </div>
            <Table className = 'menu'>
                <TableHeader>
                    <TableRow>
                        <TableRowColumn>
                            <Link to="/"><RaisedButton key="1">My Tasks</RaisedButton></Link>
                        </TableRowColumn>
                        <TableRowColumn>
                            <Link to="/creategroup"><RaisedButton key="2" >Create Group</RaisedButton></Link>
                        </TableRowColumn>
                        {groups}
                    </TableRow>
                </TableHeader>
            </Table>
               </div>         
        );
    }
}