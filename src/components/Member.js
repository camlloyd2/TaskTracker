import React from 'react';

export default class Member extends React.Component {
    render(){
        return(
        <tr key ={this.props.ii}>
            <td key={this.props.ii+".1"}>{this.props.member.name}</td>
            <td key={this.props.ii+".2"}>{this.props.member.score}</td>
         </tr>
        );
    }
}