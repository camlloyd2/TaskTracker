import React from 'react';
export default class SingleTask extends React.Component {
    render(){
        return(
        <tr key ={this.props.ii}>
            <td key={this.props.ii+".1"}>{this.props.task.group}</td>
            <td key={this.props.ii+".2"}>{this.props.task.name}</td>
            <td key={this.props.ii+".3"}>{this.props.task.imp}</td>
            <td key={this.props.ii+".4"}>{this.props.task.due}</td>
            <td key={this.props.ii+".5"}><button onClick={() => this.props.confirmComplete(this.props.ii)}>Complete!</button></td>
         </tr>
        );
    }
}