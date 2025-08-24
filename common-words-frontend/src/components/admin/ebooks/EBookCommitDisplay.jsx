import React, { useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { ReactReader, ReactReaderStyle } from 'react-reader';

const EBookCommitDisplay = ({selectedUrl, getEBookMetadata}) => {
    const renditionRef = useRef(null)

    // useEffect (() => {
    //   if(bookMetadata){
    //     getEBookMetadata(bookMetadata);
    //   }
    // }, [bookMetadata])
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
        getEBookMetadata(rendition.book.packaging.metadata)
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
      <div className='reader-container' style={{ visibility: "hidden", width: '40vh', height: '50vh' }}>
        <ReactReader
          url={'/api/download/' + selectedUrl}
          epubInitOptions={{
              openAs: 'epub',
          }}
          readerStyles={ownStyles}
          getRendition={rendition => {
              
              renditionRef.current = rendition
              renditionRef.current.themes.default({
              '::selection': {
              background: 'orange'
          }
          })
          handleGetRendition(rendition)
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
            {selectedUrl && 
              <>
                {reader}
              </>
            }
      </>
    );  
}

export default EBookCommitDisplay;