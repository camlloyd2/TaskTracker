import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
export default class Other extends React.Component {
    render(){
        if(!(this.props.id == null)){
              return (<Redirect to="/" />)
          }
          else{
              return (<Redirect to="/login" />)
          }
    }
}