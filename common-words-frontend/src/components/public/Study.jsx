import { Link } from 'react-router-dom';
import TraversalButton from '../common/TraversalButton';
import {useState, useEffect }from 'react';
import DeckOptionsDropdown from '../admin/flashcard-decks/DeckOptionsDropdown';
import { useNavigate } from 'react-router';
import DeletePopUp from '../common/DeletePopUp';
import AddDeckButton from '../admin/flashcard-decks/AddDeckButton';
import LinkButton from '../common/LinkButton';
import Buffer from '../common/Buffer';

const Study = ({allDecks, handleDeckClick, handleDeckEditClick, deleteDeck, addDeck, saveNewLanguage, curLanguages}) => {
    const [showingPopUp, setShowingPopUp] = useState({showing: false, name: "", id: ""});
    const oneDayMS = 86400000;
    const [isEditing, setEditing] = useState(false);
    const navigate = useNavigate();
    const [vocabStash, setVocabStash] = useState([]);
    useEffect(()=> {
      if(localStorage.getItem('vocabStash')){
        setVocabStash(localStorage.getItem('vocabStash'))
      }
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

  const getJSXWithLangID = (langId) => {
    let deckFound = false;
    let decks = allDecks.map(deck => {
        if (parseInt(deck.languageId) === parseInt(langId)){//We only want the decks from our currently selected language
            deckFound = true;
            return <div key={deck.id} className="language-button-row">
                <Link className={"deck-button"} to="/Quiz">
                    <TraversalButton onClick={handleDeckClick} id={deck.id.toString()} text={deck.name}/>
                </Link>
                <div className="deck-info">Total: {deck.flashCards.length + " "}  
                    Due: {deck.flashCards.filter((word) => {
                        return wordIsReadyForReview(word);
                    }).length} 
                    <DeckOptionsDropdown deckId={deck.id.toString()} onClick={handleDeckOptionsClick}/>       
                </div>
            </div>
            }
        })
    if (!deckFound){
        decks = [];
    }
    return (decks)
  }

    const decksJSX = curLanguages.map(language => {
        const decks = getJSXWithLangID(language.id);
        console.log
        return (
            <div className="language-category-jsx">
                {language.name}
                <hr className='solid-divider-decks'></hr>
                {decks.length == 0 ? "No decks" : decks}
            </div>
        )
    })

    return (
        <div className="page-container">
            <Buffer></Buffer>
            <div className="center-content">
                <div className='form-row'>
                    <AddDeckButton text="start new deck" handleNewListItem={addDeck} sendBackEditingStatus={setEditing} saveNewLanguage={saveNewLanguage} curLanguages={curLanguages}/>
                    {!isEditing && <LinkButton linkPath={"/CreateFromStash"} type={"button"} text={" "} styleClass={"stash-button-study"}/>} {!isEditing && "Create from stash"}
                </div>
                {/* <div>{!isEditing && decksJSX}</div> */}
                <div>
                    <>
                        {decksJSX}
                        <LinkButton linkPath={"/"} type={"button"} text={"Back"} />
                    </>
                </div>
                {showingPopUp.showing && <DeletePopUp objectName={showingPopUp.name} eventId={showingPopUp.id} deletionRef={deleteChosen} abortRef={showPopUpFalse}/>}
            </div>
            <Buffer></Buffer>
        </div>
    );
}

export default Study;