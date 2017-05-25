import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Individualdash from  './components/Individualdash';
//var PropTypes = require('prop-types');

class App extends Component {
  constructor(){
    super();
  }
    render() {
      return (
        <Router>
          <div>
            <Route exact={true} path="/" component={Individualdash} />
            <Route path="/groups/:group" component={Groupdash} />
          </div>
        </Router>
    );
    }
}
export default App;
