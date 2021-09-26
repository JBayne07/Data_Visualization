// import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react'
// import Routes from './routes';
import Navbar from './components/navbar';

class App extends Component{
  render(){
    return(
      <div>
        <Navbar />
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
