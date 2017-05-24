import React from 'react';
require("../styles/Menu.css");

export default class Header extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        var groups =[];
        for (var i=0;i<this.props.groups.length;i++){
            groups.push(<button className="groupbutton" key={i}>{this.props.groups[i].name}</button>)
        }
        return (
            <div>
                <button>My Tasks</button>
                <button>Create Group</button>
                
                {groups}
            </div>
        );
    }
}