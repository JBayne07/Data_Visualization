// import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes';
import {Navbar} from './components/navbar';

class App extends Component{
  render(){
    return(
      <div>
        <Router>
          <Navbar />
          <Routes />
        </Router>
      </div>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <Navbar/>
//       <Routes/>
//     </div>
//   );
// }

export default App;
