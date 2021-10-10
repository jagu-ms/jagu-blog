import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Mine from './components/Mine';
import CreatePost from './components/CreatePost';
import ViewPost from './components/ViewPost';
import EditPost from './components/EditPost';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    let token = localStorage.getItem('token');
    axios.defaults.headers.common = {'Authorization': token}; 
  }
  render() {
    return (
      <div>
          <Router>
            <Header></Header>
            <div>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route  path="/login" component={Login}/>
                <Route  path="/signup" component={Signup}/>
                <Route  path="/mine" component={Mine}/>
                <Route  path="/post/create" component={CreatePost}/>
                <Route  path="/post/view/:id" component={ViewPost}/>
                <Route  path="/post/edit/:id" component={EditPost}/>
              </Switch>
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
