import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DisplaySummary = ({summary}) => {
    return(
        <div className="container">
            <div className="mt-4 p-2">
                <p>{summary}</p>
            </div>
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
          <DisplaySummary summary={text}/>
        </div>
      );
}
export default Summary;