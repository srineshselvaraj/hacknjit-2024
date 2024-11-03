import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DisplaySummary = ({summary}) => {
    return(
        <div className="container">
        <div className="mt-4">
            <p>{summary}</p>
        {/*{loading ? (
            <div className="container">
                <div className="align-items-center">
                <p>Loading summary...</p>
                </div>
            </div>
            ) : (
            <p>{summary}</p>
            )}*/}
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

const Summary = ({text}) => {
    /*const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getSummary = async() => {
            try{
                const response = await fetch('http://localhost:5000/get-data');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Fetched data:", data
                setText(data.summary);
            } catch(error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getSummary();
    }, []);*/

    return(
        <div>
          <Return />
          <DisplaySummary summary={text}/>
        </div>
      );
}
export default Summary;