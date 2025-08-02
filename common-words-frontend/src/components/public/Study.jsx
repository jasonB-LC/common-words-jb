import StyledLink from '../common/StyledLink';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import TraversalButton from '../TraversalButton';
import {useState, useEffect }from 'react';

const Study = ({curDecksJSX}) => {
    const oneDayMS = 86400000;
    const [isEditing, setEditing] = useState(false);
    
    // const decksJSX = languageData.map(lang => {
        
    //     if (parseInt(lang.id) === parseInt(curLangId)){
    //         console.log( "lang.id" + lang.id)
    //         return lang.decks.map(deck => {
    //             return <div>
    //                     <TraversalButton onClick={handleDeckClick} id={deck.id.toString()} text={deck.name} isEditing={isEditing}/>
    //                     <span>Total: {deck.flashCards.length}  
    //                     Due: {deck.flashCards.filter((word) => {
    //                         return wordIsReadyForReview(word);
    //                     }).length} 
    //                     {/* <button className='delete-button' onClick={showPopUpTrue} name={deck.name + " Deck"}  id={deck.id.toString()} disabled={isEditing}>x</button> */}
    //                     </span>
    //             </div>
    //         })
    //     }
    // })
    // const decksJSX2 = getCurDecks().map(deck => {
    //     return <div>
    //             <TraversalButton onClick={handleDeckClick} text={deck.name} isEditing={isEditing}/>
    //             <span>Total: {deck.flashCards.length}  
    //             Due: {deck.flashCards.filter((word) => {
    //                 return wordIsReadyForReview(word);
    //             }).length} 
    //             {/* <button className='delete-button' onClick={showPopUpTrue} name={deck.name + " Deck"}  id={deck.id.toString()} disabled={isEditing}>x</button> */}
    //             </span>
    //     </div>
    // })
        
    return (
        <>
            <div>{curDecksJSX}
            </div>
            {/* <StyledLink destination="/">{"Home"}</StyledLink> */}
            <Link to="/">
                <button type="button">Back</button>
            </Link>
            
        </>
    );
}

export default Study;