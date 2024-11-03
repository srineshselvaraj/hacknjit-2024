//import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Summary from './Summary';
import Questions from './Questions';
import Flashcards from './Flashcards';

function Header(){
  const location = useLocation();
  return(
    <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
          <div id="header" className="d-flex justify-content-between align-items-center w-100 ms-3 me-3">
            <Link className="navbar-brand display-1" to="/">
              COGnition
            </Link>
            {location.pathname === '/' && (
              <button id="loginButton" className="btn btn-warning">
                <Link className="linkButton" to="/login">Login</Link>
              </button>
            )}
          </div>
        </div>
    </nav>
  );
}

//Function for sending data to backend
const sendData = async(inputData, url) => {
  try{
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usertext:inputData }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch(error){
    console.error(error);
    return null;
  }
}

function UploadText({onSummaryUpdate, onQuestionsUpdate, onFlashcardsUpdate}){
  const [input, setInput] = useState('');
  const handleSend = async (url) => {
    const data = { input };
    return await sendData(data, url);
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
  const handleSummaryClick = async (event) => {
    event.preventDefault(); // Prevent any default action
    const result = await handleSend("http://localhost:5000/get-data");
    if (result) { // Only navigate if result is successful
      onSummaryUpdate(result);
    }
  };

  const handleQuestionsClick = async (event) => {
    event.preventDefault(); // Prevent any default action
    const result = await handleSend("http://localhost:5000/questions");
    if (result) { // Only navigate if result is successful
      onQuestionsUpdate(result);
    }
  };

  const handleFlashcardsClick = async (event) => {
    event.preventDefault(); // Prevent any default action
    const result = await handleSend("http://localhost:5000/flashcards");
    if (result) { // Only navigate if result is successful
      onFlashcardsUpdate(result);
    }
  };

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
        <textarea id="inputText" value={input} onChange={(e) => setInput(e.target.value)} className="form-control" rows="20"></textarea>
        <div className="d-flex justify-content-center">
          <SubmitButton handleClick={handleSummaryClick} text="Summary"/>
          <SubmitButton handleClick={handleQuestionsClick} text="Quiz"/>
          <SubmitButton handleClick={handleFlashcardsClick} text="Flashcards"/>
        </div>
      </div>
    </div>
  );
}

const SubmitButton = ({ handleClick, text }) => {
  return(
    <div className='container'>
      <div className="d-flex justify-content-center align-items-center mt-3">
          <button type="button" className="btn btn-success" onClick={handleClick}>{text}</button>
        </div>
    </div>
  );
}

function AppRoutes() {
  const [summary, setSummary] = useState('');
  const [questions, setQuestions] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const navigate = useNavigate();

  const updateSummary = (data) => {
    setSummary(data);
    navigate("/summary");
  };
  const updateQuestions = (data) => {
    setQuestions(data);
    navigate("/questions");
  };
  const updateFlashcards = (data) => {
    setFlashcards(data);
    navigate("/flashcards");
  };

  return (
    <div>
    <Header />
      <Routes>
          <Route path="/" element={<UploadText onSummaryUpdate={updateSummary} onQuestionsUpdate={updateQuestions} onFlashcardsUpdate={updateFlashcards}/>} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/summary" element={<Summary text={summary}/>} /> 
          <Route path="/questions" element={<Questions questions={questions}/>} /> 
          <Route path="/flashcards" element={<Flashcards terms={flashcards}/>} /> 
      </Routes>
    </div>
  );
}

function App(){
  return(
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
