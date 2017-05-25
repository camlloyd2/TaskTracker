import React from 'react';
import star from '../images/star.gif';
import SingleTask from  './SingleTask';
require("../styles/Tasks.css");

export default class Tasks extends React.Component {
    render(){
        var tasks = [];
        for(var i=0;i<this.props.tasks.length;i++){
            if(this.props.tasks[i].completed == false){
                tasks.push(
                    <SingleTask ii={i} task={this.props.tasks[i]} confirmComplete={this.props.confirmComplete}/>
            );
            }
        }
        return (
            <table className="taskTable">
                <tr key="1">
                    <th key="1.1">Group</th>
                    <th key="1.2">Task Name</th>
                    <th key="1.3">Importance</th>
                    <th key="1.4">Due on</th>
                    <th key="1.5"><img className="completeStar" src={star} /></th>
                </tr>
                {tasks}
            </table>
        );
    }
}
