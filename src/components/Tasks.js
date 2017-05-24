import React from 'react';
import star from '../images/star.gif';
import SingleTask from  './SingleTask';
require("../styles/Tasks.css");

export default class Tasks extends React.Component {
    constructor(props){
        //this.cc = this.props.confirmComplete.bind(this);
        super(props);
    }
    render(){
        var tasks = [];
        for(var i=0;i<this.props.tasks.length;i++){
            var cn = "task"+i;
            var ii = i;
            //function cc = this.props.confirmComplete();
            if(this.props.tasks[i].completed == false){
                tasks.push(
                    <SingleTask  cn={cn} ii={ii} tasks={this.props.tasks[i]} confirmComplete={this.props.confirmComplete}/>
            );
            }
        }
        return (
            <table className="taskTable">
                <tr>
                    <th>Group</th>
                    <th>Task Name</th>
                    <th>Importance</th>
                    <th>Due on</th>
                    <th><img className="completeStar" src={star} /></th>
                </tr>
                {tasks}
            </table>
        );
    }
}
