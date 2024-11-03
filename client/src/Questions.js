import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const sendResponse = async (inputData, setFeedback, setLoadFeedback) => {
  try {
    const response = await fetch("http://localhost:5000/feedback", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers: inputData }),
    });
    const result = await response.json();
    console.log(result);
    setFeedback(result);  // Set feedback directly from the POST response
    setLoadFeedback(false);  // Mark loading as false once feedback is received
  } catch (error) {
    console.error(error);
  }
};

function Question({ questions, handleSend }) {
  const [inputs, setInputs] = useState(Array(questions.length).fill(''));

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  return (
    <div className='container'>
      <div className='mt-4 p-2'>
        {questions.map((question, index) => (
          <div key={index} className="mt-4">
            <p>{question}</p>
            <textarea
              id="inputText"
              value={inputs[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="form-control"
              rows="2"
            ></textarea>
          </div>
        ))}
        <SubmitButton handleClick={() => handleSend(inputs)} />
      </div>
    </div>
  );
}

const SubmitButton = ({ handleClick }) => {
  return (
    <div className='container'>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <button type="submit" className="btn" onClick={handleClick}>Submit</button>
      </div>
    </div>
  );
}

const Feedback = ({ feedback, loading, isSubmitted }) => {
  return (
    <div className="container">
      <div className="mt-4">
        {loading ? isSubmitted (
          <div className="container">
            <div className="align-items-center">
              <p>Loading feedback...</p>
            </div>
          </div>
        ) : (
          <p>{feedback}</p>
        )}
      </div>
    </div>
  );
}

const Questions = ({ questions }) => {
  const [feedback, setFeedback] = useState('');
  const [loadFeedback, setLoadFeedback] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const handleSend = async (inputs) => {
    // Use sendResponse to POST and update feedback state
    setFeedback('');
    setLoadFeedback(true);  // Start loading
    setSubmitted(true);
    await sendResponse(inputs, setFeedback, setLoadFeedback); // Send response and set feedback
  };

  return (
    <div>
      <Question questions={questions} handleSend={handleSend} />
      <Feedback feedback={feedback} loading={loadFeedback} isSubmitted={isSubmitted}/>
    </div>
  );
}

export default Questions;
