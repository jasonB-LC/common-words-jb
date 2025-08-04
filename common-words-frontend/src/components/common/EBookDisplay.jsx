import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const EBookDisplay = () => {
    useEffect(() => {
        fetchEBook();
    }, []);


    const fetchEBook = async () => {
        let response;
        let data;

        try {
        response = await fetch('http://localhost:8080/files/eBooks/pg1.txt', {
				method: 'GET',
				headers: {
					'Accept': '*/*',
                    'Connection': 'keep-alive',
                    'Accept-Encoding': 'gzip, deflate, br'
				}
			});
        data = await response.json();
        
        } catch (error) {
            console.error(error.message);
        }
}
    return (
        <div>
            <h1>Displaying UTF-8 Text</h1>
            {/* <div onMouseUp={handleMouseUp}>{selectedText}
                <p>{eBook}</p>
                <iframe id="text-display" src="http://localhost:8080/files/eBooks/pg1.txt" width="500" height="300"></iframe>
                <p>This is some plain text with special characters like é, ü, ñ.</p>
            </div> */}
            <Link to="/">
                <button type="button">Back</button>
            </Link>
        </div>
    // src={"http://localhost:8080/files/soundfiles/" + currentCard.soundfilePath}
    );  
}

export default EBookDisplay;