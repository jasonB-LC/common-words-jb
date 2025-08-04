import { Link } from 'react-router-dom';
import TraversalButton from '../common/TraversalButton';
import {useState, useEffect }from 'react';
import DeckOptionsDropdown from '../common/DeckOptionsDropdown';
import { useNavigate } from 'react-router';
import DeletePopUp from '../common/DeletePopUp';
import AddItemButton from '../common/AddItemButton';
import LinkButton from '../common/LinkButton';

const Study = ({allDecks, curLanguageIndex, handleDeckClick, handleDeckEditClick, deleteDeck, addDeck}) => {
    const [showingPopUp, setShowingPopUp] = useState({showing: false, name: "", id: ""});
    const oneDayMS = 86400000;
    const [isEditing, setEditing] = useState(false);
    const navigate = useNavigate();

    useEffect (() => {

    }, [])

    const deleteChosen = (e) => {
        deleteDeck(showingPopUp.id)
        showPopUpFalse();

    }
    const showPopUpTrue = (deck) =>{
        setShowingPopUp({showing: true, name: deck.name, id: deck.id});
        setEditing(true);
    }

    const showPopUpFalse = () => {
        setShowingPopUp({showing: false, name: "", id: ""});
        setEditing(false);
    }

    const wordIsReadyForReview = (word) => {
        let TodaysDate = Date.now();
        let timeElapsedMS = TodaysDate - word.dateOfLastReview;
        let timeUntilNextReviewMS = oneDayMS * word.daysUntilDue;
        return timeElapsedMS > timeUntilNextReviewMS
    };

  const handleDeckOptionsClick = (deckId, optionSelected) => {
    allDecks.map((deck) => {
        if (deckId == deck.id){
            handleDeckEditClick(deckId);
            switch (optionSelected){
                case "addWord":
                    navigate('/AddWordForm');
                    break;
                case "editList":
                    navigate('/EditList');
                    break;
                case "deleteDeck":
                    showPopUpTrue(deck)
                    break;
            }
        }
    })
  }
    const decksJSX = allDecks.map(deck => {
    if (parseInt(deck.languageId) === parseInt(curLanguageIndex)){//We only want the decks from our currently selected language
        return <div>
            <Link to="/Quiz">
                <TraversalButton onClick={handleDeckClick} id={deck.id.toString()} text={deck.name}/>
            </Link>
            <span>Total: {deck.flashCards.length}  
                Due: {deck.flashCards.filter((word) => {
                    return wordIsReadyForReview(word);
                }).length} 
                <DeckOptionsDropdown deckId={deck.id.toString()} onClick={handleDeckOptionsClick}/>       
                {/* <button className='delete-button' onClick={showPopUpTrue} name={deck.name + " Deck"}  id={deck.id.toString()} disabled={isEditing}>x</button> */}

            </span>
            </div>
        }
    })

    const deckEditing = (
        <div>editing</div>
    );

    return (
        <>
            <div>{isEditing ? deckEditing : decksJSX}</div>
            <div>{!isEditing && <LinkButton linkPath={"/"} type={"button"} text={"Back"} />}</div>
            <AddItemButton text="start new deck" handleNewListItem={addDeck} sendBackEditingStatus={setEditing}/>
            {showingPopUp.showing && <DeletePopUp objectName={showingPopUp.name} eventId={showingPopUp.id} deletionRef={deleteChosen} abortRef={showPopUpFalse}/>}
        </>
    );
}

export default Study;