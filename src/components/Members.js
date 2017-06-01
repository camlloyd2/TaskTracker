import React from 'react';
import Member from './Member';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
require('../styles/Members.css');
var _this;

export default class Members extends React.Component {
    constructor(props){
        super(props);
        _this = this;
        this.state = {
            value: ''
        }
    }
    handleChange(e){
        _this.setState({value:e.target.value});
    }
    handleSubmit(e){
        _this.props.addMember(_this.state.value);
        _this.setState({value:''});
    }
    render() {
        var members = [];
        for (var i = 0; i < _this.props.members.length; i++) {
            members.push(
                <Member ii = {i} member = {_this.props.members[i]} />
            );       
        }
        return(
            <div className="memberTable">
                <Table className="MemberTable">
                    <TableHeader displaySelectAll={false}
              adjustForCheckbox={false}>
                        <TableRow selectable={false}>
                            <TableRowColumn> Members </TableRowColumn>
                            <TableRowColumn> Score </TableRowColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {members} 
                        <TableRow selectable={false}>
                            <TableRowColumn> <TextField hintText="New Member Name" value ={_this.state.value} onChange={_this.handleChange} /></TableRowColumn>
                            <TableRowColumn> <FlatButton onClick={() => _this.handleSubmit()}>Submit</FlatButton> </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
          
        )
    }
}

