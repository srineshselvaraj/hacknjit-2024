import { useState } from 'react';
import { Link } from 'react-router-dom';
const sendResponse = async(inputData) => {
    try{
      const response = await fetch("http://localhost:5000/feedback", {
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

function Question({questions, loading, getFeedback}) {
    const [inputs, setInputs] = useState(Array(questions.length).fill(''));
    const handleInputChange = (index, value) => {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
    };
    const handleSend = () => {
      const data = { inputs };
      sendResponse(data);
    };
  
    const handleSubmit = () => {
      handleSend();
      getFeedback();
    }
  
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
                    value={inputs[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="form-control"
                    rows="2"
                  ></textarea>
                </div>
              ))}
              <SubmitButton handleClick={handleSubmit}/>
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
  
const Feedback = ({response, loading}) => {
    return(
      <div className="container">
        <div className="mt-4">
        {loading ? (
            <div className="container">
              <div className="align-items-center">
                <p>Loading feedback...</p>
              </div>
            </div>
          ) : (
            <p>{response}</p>
          )}
        </div>
      </div>
    );
}

const Return = () => {
    return (
        <div className='container'>
            <p>
                Back to <Link to="/">Home</Link>
            </p>
        </div>
    );
}

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState('');
    const [loadFeedback, setLoadFeedback] = useState(true);
  
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
  
    const getFeedback = async() => {
      try{
        const response = await fetch('http://localhost:5000/feedback');
        const data = await response.json();
        setFeedback(data);
      } catch(error) {
        console.error(error.message);
      } finally {
        setLoadFeedback(false);
      }
    };

    getQuestions();
  
    return(
      <div>
        <Return />
        <Question questions={questions} loading={loading} getFeedback={getFeedback}/>
        <Feedback feedback={feedback} loading={loadFeedback} />
      </div>
    );
}

export default Questions;