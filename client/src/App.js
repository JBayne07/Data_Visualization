// import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes';
import {Navbar} from './components/navbar';

class App extends Component{
  render(){
    return(
      <>
        <Router>
          <Navbar />
          <Routes />
        </Router>
      </>
    )
  }
}

export default App;
