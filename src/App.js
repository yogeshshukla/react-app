// App.js

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/nav.component';
import Routing from './components/routing';
import AuthHelperMethods from "./AuthHelperMethods";


const Auth = new AuthHelperMethods();
class App extends Component {
  
  render() {
    const contStyle = {
      height: 'max-content',
      background: '#fff'
    }
     return (
        <div className="container" style={contStyle}>
          <Nav />
          <br/>
          <h2>Welcome to Headless Drupal CRUD</h2> <br/>
          <Routing />
        </div>
      
    );
  }
}
export default App;