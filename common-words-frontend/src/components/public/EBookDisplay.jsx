import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const EBookDisplay = () => {

    return (
        <div>
            <h1>Displaying UTF-8 Text</h1>
            {/* <div onMouseUp={handleMouseUp}>{selectedText}
                <p>{eBook}</p>
                <iframe id="text-display" src="http://localhost:8080/files/eBooks/pg1.txt" width="500" height="300"></iframe>
                <p>This is some plain text with special characters like é, ü, ñ.</p>
            </div> */}
            <h1>EBook</h1>
        </div>
    );  
}

export default EBookDisplay;