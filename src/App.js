import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Individualdash from  './components/Individualdash';
import Groupdash from  './components/Groupdash';
import Login from  './components/Login';
import Creategroup from  './components/Creategroup';
import Createaccount from  './components/Createaccount';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
require('./styles/App.css');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id:"-KlZK5LSVBOEND7SCbq-"
  }
  this.updateState = this.updateState.bind(this);
}
    updateState(key){
      this.state({id:key});
    }
    render() {
      return (
        <Router>
          <MuiThemeProvider>
          <div className="App">
            <Route exact={true} path="/" component={() => (<Individualdash id={this.state.id} />) } />
            <Route path="/groups/:group" component={() => (<Groupdash id={this.state.id} />) } />
            <Route path="/login" component={() => (<Login updateId={this.updateState} />) } />
            <Route path="/creategroup" component={() => (<Creategroup id={this.state.id} />) } />
            <Route path="/createaccount" component={() => (<Createaccount updateId={this.updateState} />) } />

          </div>
          </MuiThemeProvider>
        </Router>
    );
    }
}
export default App;
