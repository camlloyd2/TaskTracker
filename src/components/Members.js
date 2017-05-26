import React from 'react';
import Member from './Member';
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
        //console.log("handle submit reached"+ _this.state.value)
        _this.props.addMember(_this.state.value);
        _this.setState({value:''});
    }
    render() {
        //console.log(this.state.members);
        var members = [];
        for (var i = 0; i < _this.props.members.length; i++) {
            members.push(
                <Member ii = {i} member = {_this.props.members[i]} />
            );       
        }
        return(
            <div>
            <table className="MemberTable">
                <tr key="1">
                    <th key="1.1">Members</th>
                    <th key="1.2">Score</th>
                </tr>
                    {members}
            </table>
                
            <div>
                <label>
                    Name:
                        <input type="text" placeholder="New Member Name" value ={_this.state.value} onChange={_this.handleChange} />
                </label>
                <button onClick={() => _this.handleSubmit()}>Submit </button>
            </div>
            </div>
          
        )
    }
}

