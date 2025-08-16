import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ReactReader } from 'react-reader';

const EBookDisplay = () => {
    const bookUrl = 'files/soundfiles/pg2701-images-3.epub';
    return (
        <div style={{ height: '100vh' }}>
        <ReactReader
            url={bookUrl}
            epubInitOptions={{
            openAs: 'epub',
            }}
        />
        </div>
    );  
}

export default EBookDisplay;