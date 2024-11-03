//import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Summary from './Summary';
import Questions from './Questions';
import Flashcards from './Flashcards';

function Header(){
  return(
    <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
          <div id="header" className="d-flex justify-content-between align-items-center w-100 ms-3 me-3">
            <a className="navbar-brand display-1" href="#">HackNJIT 2024</a>
            <button id="loginButton" className="btn btn-warning">
              <Link to="/login">Login</Link>
            </button>
          </div>
        </div>
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
  const handleSend = async () => {
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
        <Link to="/summary">
          <SubmitButton handleClick={handleSend} text="Summary"/>
        </Link>
        <Link to="/questions">
          <SubmitButton handleClick={handleSend} text="Quiz"/>
        </Link>
        <Link to="/flashcards">
          <SubmitButton handleClick={handleSend} text="Flashcards"/>
        </Link>
      </div>
    </div>
  );
}

const SubmitButton = ({ handleClick, text}) => {
  return(
    <div className='container'>
      <div className="d-flex justify-content-center align-items-center mt-3">
          <button type="submit" className="btn btn-success" onClick={handleClick}>{text}</button>
        </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
      <Header />
        <Routes>
            <Route path="/" element={<UploadText />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/summary" element={<Summary />} /> 
            <Route path="/questions" element={<Questions />} /> 
            <Route path="/flashcards" element={<Flashcards />} /> 
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
