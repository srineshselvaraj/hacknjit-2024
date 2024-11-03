//import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';

function Header(){
  return(
    <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
          <div id="header" className="d-flex justify-content-between align-items-center w-100 ms-3 me-3">
            <a className="navbar-brand display-1" href="#">HackNJIT 2024</a>
            <button id="loginButton" className="btn btn-warning">Login</button>
          </div>
        </div>
        {/*
        <div id="gacha" className="d-flex justify-content-around me-3">
          <button id="gachaButton" className="btn btn-danger">Gacha</button>
        </div>
        */} 
    </nav>
  );
}

//Function for sending data to backend
const sendData = async(inputData) => {
  try{
    const response = await fetch("http://localhost:5000/get-data", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usertext:inputData }),
    });
    const result = await response.json();
    console.log(result);
  } catch(error){
    console.error(error);
  }

  try{
    const response = await fetch("http://localhost:5000/questions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usertext:inputData }),
    });
    const result = await response.json();
    console.log(result);
  } catch(error){
    console.error(error);
  }
}

function UploadText({ getQuestions }){
  const [input, setInput] = useState('');
  const handleSend = () => {
    const data = { input };
    sendData(data);
  };
  const handleUpload = async(event) => {
    const file = event.target.files[0];
    if(!file) return;
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  const fileRef = useRef(null);
  const handleClick = () => {
    fileRef.current.click();
  }
  return(
    <div className='container'>
      <div className="mt-4">
        <h3 className="insertText">Insert your text here:</h3>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <p className="insertText mb-0">Or upload an image/PDF:</p>
          <div>
            <input id='fileInput' type="file" accept='image/*,.pdf' ref={fileRef} onChange={handleUpload} />
            <button onClick={handleClick} className="btn btn-primary ms-3">Import text with OCR</button>
          </div>
        </div>
        <textarea id="inputText" value={input} onChange={(e) => setInput(e.target.value)} className="form-control" rows="5"></textarea>
        {/*
        <div className="d-flex justify-content-center align-items-center mt-3">
          <button type="submit" className="btn btn-success" onClick={handleSend}>Submit</button>
        </div>
        */}
        <SubmitButton handleClick={() => {
          handleSend(); 
          getQuestions();
        }} />
      </div>
    </div>
  );
}

function Question({questions, loading}) {
  const [input, setInput] = useState('');
  const handleSend = () => {
    const data = { input };
    sendData(data);
  };

  return(
    <div className='container'>
      <div className='mt-4'>
        {loading ? (
          <div className="container">
            <div className="align-items-center">
              <p>Loading questions...</p>
            </div>
          </div>
        ) : (
          <>
            {questions.map((question, index) => (
              <div key={index} className="mt-4">
                <p>{question}</p>
                <textarea
                  id="inputText"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="form-control"
                  rows="2"
                ></textarea>
              </div>
            ))}
            {/* Button will only be displayed when loading is false */}
            <SubmitButton handleClick={handleSend}/>
          </>
        )}
      </div>
    </div>
  );
}

const SubmitButton = ({ handleClick }) => {
  return(
    <div className='container'>
      <div className="d-flex justify-content-center align-items-center mt-3">
          <button type="submit" className="btn btn-success" onClick={handleClick}>Submit</button>
        </div>
    </div>
  );
}

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const getQuestions = async() => {
    try{
      const response = await fetch('http://localhost:5000/questions');
      const data = await response.json();
      setQuestions(data);
    } catch(error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <UploadText getQuestions={getQuestions}/>
      <Question questions={questions} loading={loading}/>
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
