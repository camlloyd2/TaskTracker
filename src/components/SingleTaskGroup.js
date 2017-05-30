// ANALAGOUS TO SINGLECONTRACT.JS

import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
//import {Button} from 'mui-react';
//import Button from 'mui-react/lib/components/Button.js';
import FlatButton from 'material-ui/FlatButton';


import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


export default class SingleTask extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props);
    }
    render(){
        console.log("addrowhereweare"+this.props.data.name);
        return(
            <MuiThemeProvider>
                <TableRow>
                    <TableRowColumn>{this.props.data.member}</TableRowColumn>
                    <TableRowColumn>{this.props.data.name}</TableRowColumn>
                    <TableRowColumn>{this.props.data.imp}</TableRowColumn>
                    <TableRowColumn>{this.props.data.due}</TableRowColumn>
                    <TableRowColumn>{this.props.data.completed}</TableRowColumn>
                </TableRow>
            </MuiThemeProvider>
        );
    }
}