import logo from './logo.svg';
import './App.css';
import Routes from './routes';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes/>
    </div>
  );
}

export default App;
