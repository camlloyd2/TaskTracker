import React from 'react';
export default class SingleTask extends React.Component {
    constructor(props){
        //this.cc = this.props.confirmComplete.bind(this);
        super(props);
    }
    render(){
        return(
        <tr className={this.props.cn}>
            <td>{this.props.tasks.group}</td>
            <td>{this.props.tasks.name}</td>
            <td>{this.props.tasks.imp}</td>
            <td>{this.props.tasks.due}</td>
            <td><button id={this.props.ii+"button"} onClick={() => this.props.confirmComplete(this.props.ii)}>Complete!</button></td>
         </tr>
        );
    }
}