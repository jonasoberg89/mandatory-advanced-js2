import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/navbar"
import { BrowserRouter,Route } from "react-router-dom"
import Home from "./components/home"
import Add from "./components/add"
import Edit from "./components/edit"
import Info from "./components/info"

class App extends Component {
  
 
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar  />
          <Route exact path="/" component={Home}></Route>
          <Route path="/Add" component={Add}></Route>
          <Route path="/Edit/:id" component={Edit}></Route>
          <Route path="/Info/:id" component={Info}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
