import React, { useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { ReactReader, ReactReaderStyle } from 'react-reader';

const EBookCommitDisplay = ({bookUrl}) => {
    // const [selections, setSelections] = useState([])
    const renditionRef = useRef(null)
    const [bookMetadata, setBookMetadata] = useState(null);

    // useEffect(() => {
    //     if (renditionRef.current) {
    //         function setRenderSelection(cfiRange, contents) {
    //             setSelections(
    //             selections.concat({
    //                 text: renditionRef.current.getRange(cfiRange).toString(),
    //                 cfiRange
    //             })
    //             )
    //             renditionRef.current.annotations.add(
    //             'highlight',
    //             cfiRange,
    //             {},
    //             null,
    //             'hl',
    //             { fill: 'orange', 'fill-opacity': '0.5', 'mix-blend-mode': 'multiply' }
    //             )
    //             contents.window.getSelection().removeAllRanges()
    //         }
    //         renditionRef.current.on('selected', setRenderSelection)
    //         return () => {
    //             renditionRef.current.off('selected', setRenderSelection)
    //         }
    //     }
    // }, [setSelections, selections])

    const handleGetRendition = (rendition) => {
      if (rendition && rendition.book && rendition.book.packaging && rendition.book.packaging.metadata) {
        setBookMetadata(rendition.book.packaging.metadata);
        console.log("Book Metadata:", rendition.book.packaging.metadata);
      }
    };
    const ownStyles = {
        ...ReactReaderStyle,
        arrow: {
            ...ReactReaderStyle.arrow,
            color: '#9b4b00ff'
        }
    }

    return (
        <>
            <div className='reader-container' style={{ width: '100vh', height: '80vh' }}>
                <ReactReader
                    url={bookUrl}
                    epubInitOptions={{
                        openAs: 'epub',
                    }}
                    
                    readerStyles={ownStyles}
                    getRendition={rendition => {
                        handleGetRendition(rendition)
                        renditionRef.current = rendition
                        renditionRef.current.themes.default({
                        '::selection': {
                        background: 'orange'
                    }
                })
                setSelections([])
            }}
                    // getRendition={rendition => {
                    //     rendition.themes.register('custom', {
                    //         body: { 'background-color': '#ffffffff', color: '#272838' }
                    //     })
                    //     rendition.themes.select('custom')
                    // }}

                />
                          {bookMetadata && (
            <div>
              <h3>Book Details:</h3>
              <p>Title: {bookMetadata.title}</p>
              <p>Author: {bookMetadata.creator}</p>
              console.log(bookMetadata)
              {/* Add more metadata fields as needed */}
            </div>
          )}
            </div>
            <div
                style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                zIndex: 1,
                backgroundColor: 'white'
                }}
            >Selection:
        <ul>
          {selections.map(({ text, cfiRange }, i) => (
            <li key={i}>
              {text}{' '}
              <button
                onClick={() => {
                  renditionRef.current.display(cfiRange)
                }}
              >
                Show
              </button>
              <button
                onClick={() => {
                  renditionRef.current.annotations.remove(cfiRange, 'highlight')
                  setSelections(selections.filter((item, j) => j !== i))
                }}
              >
                x
              </button>
            </li>
          ))}
        </ul></div>
        </>
    );  
}

export default EBookCommitDisplay;