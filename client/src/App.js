//import logo from './logo.svg';
import './App.css';

function Header(){
  return(
    <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div id="title" className="d-flex justify-content-start ms-3">
          <a className="navbar-brand" href="#">HackNJIT 2024</a>
        </div>
        <div id="login" className="d-flex justify-content-end me-3">
          <button id="login-button" className="btn btn-warning">Login</button>
        </div>
        <div id="gacha" className="d-flex justify-content-end me-3">
          <button id="gacha-button" className="btn btn-danger">Gacha</button>
        </div>
    </nav>
  );
}
function App() {
  return (
    <div>
      <Header />
    </div>
  );
  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  */
}

export default App;
