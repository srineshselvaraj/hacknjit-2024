import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Card = ({ term, definition }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      onClick={() => setIsFlipped(!isFlipped)} 
      style={{
        width: '300px',
        height: '200px',
        margin: '10px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isFlipped ? '#f0f8ff' : '#fff',
      }}
    >
      <h3>{isFlipped ? definition : term}</h3>
      <p>Click to {isFlipped ? "see term" : "see definition"}</p>
    </div>
  );
};

const DisplayCards = ({ terms, loading }) => {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {loading ? (
          <p>Loading flashcards...</p>
        ) : (
          terms.map(flashcard => (
            <Card question={flashcard.question} answer={flashcard.answer} />
          ))
        )}
      </div>
    );
  };
  

const Return = () => {
  return (
    <div className='container'>
      <p>
        Back to <Link to="/">Home</Link>
      </p>
    </div>
  );
};

const Flashcards = () => {
    const [terms, setTerms] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getFlashcards = async () => {
            try {
                const response = await fetch('http://localhost:5000/flashcards');
                const data = await response.json();
                setTerms(data);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getFlashcards(); // Call the function once when the component mounts
    }, []);

  return (
    <div>
      <Return />
      <DisplayCards terms={terms} loading={loading} />
    </div>
  );
}

export default Flashcards;
