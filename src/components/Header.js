import React from 'react';
import clipboard from '../images/clipboard.png';
import Time from 'react-time';
require("../styles/datetime.css");
require("../styles/Header.css");

export default class Header extends React.Component {
    constructor(props){
        super(props);

    }
        render(){
            let now= new Date();
            return (
                <div className="Header" >
                    <div key="1" className="headerLeft">
                        <h1> Task Tracker </h1>
                        <img className="clipboard" src={clipboard} />
                    </div>
                    <div key="2" className="headerRight">
                        <Time className="headertime"value={now} format="MM/DD/YYYY" />
                         <h2> {this.props.name} </h2>
                   </div>
                </div>
            );
        }
}