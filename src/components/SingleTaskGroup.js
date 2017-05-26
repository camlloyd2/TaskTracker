import React from 'react';
export default class SingleTask extends React.Component {
    render(){
        console.log(this.props.task);
        return(
        <tr key ={this.props.ii}>
            <td key={this.props.ii+".1"}>{this.props.task.member}</td>
            <td key={this.props.ii+".2"}>{this.props.task.name}</td>
            <td key={this.props.ii+".3"}>{this.props.task.imp}</td>
            <td key={this.props.ii+".4"}>{this.props.task.due}</td>
            <td key={this.props.ii+".5"}>{this.props.task.completed}</td>
         </tr>
        );
    }
}