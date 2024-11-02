//import logo from './logo.svg';
import './App.css';

function Button(){
  return(
    <button type="button" className="btn btn-primary">Button!!</button>
  );
}
function App() {
  return (
    <div>
      <h1>GAMER</h1>
      <Button />
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
