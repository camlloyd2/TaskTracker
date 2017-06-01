import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
require("../styles/Menu.css");

export default class Menu extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        var groups =[];
        for (var i=0;i<this.props.groups.length;i++){
            var key=2+i;
            groups.push(<button className="menubutton" key={key}>{this.props.groups[i].name}</button>)
        }
        return (
            <div className="Menu">
                <button className="menubutton" key="1">My Tasks</button>
                <button className="menubutton" key="2">Create Group</button>
                
                {groups}
            </div>
        );
    }
}