import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Individualdash from  './components/Individualdash';
import Groupdash from  './components/Groupdash';
import Login from  './components/Login';
import Other from  './components/Other';
import Creategroup from  './components/Creategroup';
import Createaccount from  './components/Createaccount';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Redirect } from 'react-router';
require('./styles/App.css');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id:sessionStorage.getItem('id')
  }
  this.updateState = this.updateState.bind(this);
}
    updateState(key){
      sessionStorage.setItem('id',key)
      this.setState({id:key});
    }
    render() {
      //console.log(this.state.id);
      return (
        <Router>
          <MuiThemeProvider>
          <div className="App">
            <Route exact={true} path="/" component={() => (<Individualdash id={this.state.id} />) } />
            <Route exact={true} path="/groups/:group" component={() => (<Groupdash id={this.state.id} />) } />
            <Route exact={true} path="/login" component={() => (<Login id={this.state.id}updateId={this.updateState} />) } />
            <Route exact={true} path="/creategroup" component={() => (<Creategroup id={this.state.id} />) } />
            <Route exact={true} path="/createaccount" component={() => (<Createaccount id={this.state.id}updateId={this.updateState} />) } />
            {/*<Route path="*" component={() => (<Other id={this.state.id} />)} />*/}
          </div>
          </MuiThemeProvider>
        </Router>
    );
    }
}
export default App;
