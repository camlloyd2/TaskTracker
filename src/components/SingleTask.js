import React from 'react';
export default class SingleTask extends React.Component {
    constructor(props){
        //this.cc = this.props.confirmComplete.bind(this);
        super(props);
    }
    render(){
        return(
        <tr key ={this.props.ii}>
            <td key={this.props.ii+".1"}>{this.props.tasks.group}</td>
            <td key={this.props.ii+".2"}>{this.props.tasks.name}</td>
            <td key={this.props.ii+".3"}>{this.props.tasks.imp}</td>
            <td key={this.props.ii+".4"}>{this.props.tasks.due}</td>
            <td key={this.props.ii+".5"}><button onClick={() => this.props.confirmComplete(this.props.ii)}>Complete!</button></td>
         </tr>
        );
    }
}