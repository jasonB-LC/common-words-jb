import React, { useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { ReactReader, ReactReaderStyle } from 'react-reader';

const EBookDisplay = ({bookUrl, addBook, location, locationChanged}) => {
    const [selections, setSelections] = useState([])
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
    const reader = (
      <div className='reader-container' >
        <ReactReader
          url={'/api/download/' + bookUrl}
          epubInitOptions={{
              openAs: 'epub',
          }}
          location={location}
          locationChanged={locationChanged}
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
      </div>
    )
    return (
      <>
          
            <button onClick={addBook}>add book</button>
            {bookUrl && 
              <>
                {reader}
                {bookMetadata && (
                  <div>
                    <h3>Book Details:</h3>
                    <p>Title: {bookMetadata.title}</p>
                    <p>Author: {bookMetadata.creator}</p>
                  </div>
                )}
              </>
            }

          {/* <div
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
                  >Show</button>
                  <button
                    onClick={() => {
                      renditionRef.current.annotations.remove(cfiRange, 'highlight')
                      setSelections(selections.filter((item, j) => j !== i))
                    }}
                  >x</button>
                </li>
              ))}
            </ul></div> */}
      </>
    );  
}

export default EBookDisplay;