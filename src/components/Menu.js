import React from 'react';
require("../styles/Menu.css");

export default class Menu extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        var groups =[];
        for (var i=0;i<this.props.groups.length;i++){
            var key="group"+i;
            groups.push(<button className="menubutton" key={key}>{this.props.groups[i].name}</button>)
        }
        return (
            <div>
                <button className="menubutton">My Tasks</button>
                <button className="menubutton">Create Group</button>
                
                {groups}
            </div>
        );
    }
}