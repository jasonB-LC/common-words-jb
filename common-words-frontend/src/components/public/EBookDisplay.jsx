import React, { useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { ReactReader, ReactReaderStyle } from 'react-reader';

const EBookDisplay = ({bookUrl}) => {
    const [selections, setSelections] = useState([])
    const renditionRef = useRef(null)

    useEffect(() => {
        if (renditionRef.current) {
            function setRenderSelection(cfiRange, contents) {
                setSelections(
                selections.concat({
                    text: renditionRef.current.getRange(cfiRange).toString(),
                    cfiRange
                })
                )
                renditionRef.current.annotations.add(
                'highlight',
                cfiRange,
                {},
                null,
                'hl',
                { fill: 'orange', 'fill-opacity': '0.5', 'mix-blend-mode': 'multiply' }
                )
                contents.window.getSelection().removeAllRanges()
            }
            renditionRef.current.on('selected', setRenderSelection)
            return () => {
                renditionRef.current.off('selected', setRenderSelection)
            }
        }
    }, [setSelections, selections])


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

export default EBookDisplay;