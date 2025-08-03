import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const EBookDisplay = () => {
    const utf8Text = "Hello, world! Привет, мир! こんにちは、世界！"; // Example UTF-8 string
    const [eBook, setEBook] = useState();
    const [selectedText, setSelectedText] = useState('');
    // useEffect(() => {
    //     fetchEBook();
    // }, []);


    // const fetchEBook = async () => {
    //     fetch('http://localhost:8080/files/eBooks/pg1.txt')
    //         .then(response => response.text())
    //         .then(data => {
    //             document.getElementById('text-container').innerText = data;
    //         })
    //         .catch(error => console.error('Error fetching text file:', error));
    // }
    addEventListener("mouseup", (event) => { })
    const handleMouseUp = () => {
        console.log("mouse up")
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
          setSelectedText(selection.toString());
        } else {
          setSelectedText(''); // Clear if nothing is selected
        }
    };
    return (
        <div>
            <h1>Displaying UTF-8 Text</h1>
            <div onMouseUp={handleMouseUp}>{selectedText}
            {/* <p>{eBook}</p>
            <div id="text-container"></div> */}
            <iframe id="text-display" src="http://localhost:8080/files/eBooks/pg1.txt" width="500" height="300"></iframe>
            <p>This is some plain text with special characters like é, ü, ñ.</p>
            </div>
            <Link to="/">
                <button type="button">Back</button>
            </Link>
        </div>
    // src={"http://localhost:8080/files/soundfiles/" + currentCard.soundfilePath}
    );  
}

export default EBookDisplay;