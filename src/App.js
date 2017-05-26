import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Individualdash from  './components/Individualdash';
import Groupdash from  './components/Groupdash';
import Login from  './components/Login';
import Creategroup from  './components/Creategroup';
import Createaccount from  './components/Createaccount';


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
            <Route path="/login" component={Login} />
            <Route path="/creategroup" component={Creategroup} />
            <Route path="/createaccount" component={Createaccount} />

          </div>
        </Router>
    );
    }
}
export default App;
