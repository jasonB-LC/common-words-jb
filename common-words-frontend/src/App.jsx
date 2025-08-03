
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './Global.css'
import Home from "./components/public/Home";
import Resources from './components/Resources';
import About from './components/About';
import { Language, Deck, FlashCard, EBook } from './classes/Exports';

import { useEffect, useState } from "react";
import Study from "./components/public/Study";
import ProtectedRoutes from "./components/admin/ProtectedRoutes";
import Login from "./components/admin/Login";
import { useImmer } from 'use-immer';
import Header from "./components/Header";
import Footer from "./components/Footer";
import TraversalButton from "./components/TraversalButton";
import Quiz from "./components/public/Quiz";
import { Link } from "react-router-dom";
import AddWordForm from "./components/AddWordForm";
import VocabTable from "./components/VocabTable";
import DeckOptionsDropdown from "./components/common/DeckOptionsDropdown";
import { deleteDeck } from "./components/common/localData";
import EBookDisplay from "./components/common/EBookDisplay";
import DeckEditList from "./components/public/DeckEditList";

function App() {
  const oneDayMS = 86400000;
  const [loading, setLoading] = useState(true);
  const [allLanguages, setAllLanguages] = useState([]);
  const [curLanguageIndex, setCurLanguageIndex] = useState(1);
	const [allDecks, setAllDecks] = useState([]);
  //To avoid having deeply nested data, we are creating a separate state for decks. allLanguages has a reference id
  //for the decks that belong to that language.
  const [curDeck, setCurDeck] =  useState({});
  const [curDue, setCurDue] = useState([])

  
  useEffect(() => {//when curDeck updates, cache a deck with only the flashcards that are currently due.
    if (curDeck.name){
        let deckToStudy = curDeck.flashCards.filter((word) => {
            return wordIsReadyForReview(word);
        })
        setCurDue(deckToStudy);
    }
  }, [curDeck])

  const fetchLanguages = async () => {
    let languages = [];

    let response;
    let data;
    
    try {
      response = await fetch('http://localhost:8080/languages');
      data = await response.json();
      
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }

    data.forEach(language => {
      let newLanguage = new Language(
        language.id,
        language.name,
      )
      languages.push(newLanguage);
    });

    setAllLanguages(languages);
  }

  const fetchDecks = async () => {
    let decks = [];

    let response;
    let data;
    
    try {
      response = await fetch('http://localhost:8080/decks');
      data = await response.json();
      
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }

    data.forEach(deck => {
      let flashCards = [];
      deck.flashCards.forEach(flashCard => {
        let newFlashCard = new FlashCard(
          flashCard.id,
          flashCard.daysUntilDue,
          flashCard.dateOfLastReview,
          flashCard.wordText,
          flashCard.imageUrl,
          flashCard.soundfilePath
        );
        flashCards.push(newFlashCard);
      })
      let newDeck = new Deck(
        deck.id,
        deck.name,
        deck.languageId,
        flashCards
      )
      decks.push(newDeck);
    })
    setAllDecks(decks);
  };

  const wordIsReadyForReview = (word) => {
      let TodaysDate = Date.now();
      let timeElapsedMS = TodaysDate - word.dateOfLastReview;
      let timeUntilNextReviewMS = oneDayMS * word.daysUntilDue;
      return timeElapsedMS > timeUntilNextReviewMS
  };

  const handleDeckClick = (event) => {
    allDecks.map((deck) => {
        if (event.target.id == deck.id){
          setCurDeck(deck);
        }
    })
  }

  const handleDeckEditClick = (deckId) => {
    allDecks.map((deck) => {
        if (deckId == deck.id){
          setCurDeck(deck);
        }
    })
  }

	useEffect(() => {
		fetchLanguages();
    fetchDecks();
	}, []);


	useEffect(() => {
		if (
			allLanguages.length > 0 &&
      allDecks.length > 0
		) {
			setLoading(false);
		}
    console.log("loading in allLanguages, useEffect" + loading);
	}, [allLanguages, allDecks]);

	useEffect(() => {
      console.log("loading in loading, useEffect" + loading);
	}, [loading]);

  // const handleDeckOptionsClick = (deckId, optionSelected) => {
  //   allDecks.map((deck) => {
  //       if (deckId == deck.id){
  //           setCurDeck(deck);
  //           switch (optionSelected){
  //             // case addWord:
  //             //   navigate('/AddWordForm');
  //             // case edit:
  //             //   navigate('/VocabEditTable');
  //             case deleteDeck:
  //               break;
  //             default:
  //               break;
  //           }
  //       }
  //   })
  // }
  // const decksJSX = allDecks.map(deck => {
  //   if (parseInt(deck.languageId) === parseInt(curLanguageIndex)){//We only want the decks from our currently selected language
  //     return <div>
  //       <Link to="/Quiz">
  //         <TraversalButton onClick={handleDeckClick} id={deck.id.toString()} text={deck.name}/>
  //       </Link>
  //       <span>Total: {deck.flashCards.length}  
  //       Due: {deck.flashCards.filter((word) => {
  //           return wordIsReadyForReview(word);
  //       }).length} 
  //       <DeckOptionsDropdown deckId={deck.id.toString()} onClick={handleDeckOptionsClick}/>
  //       <Link to="/AddWordForm">
  //         <button onClick={handleDeckClick} id={deck.id.toString()}>Add Word</button>
  //       </Link>        
  //       {/* <button className='delete-button' onClick={showPopUpTrue} name={deck.name + " Deck"}  id={deck.id.toString()} disabled={isEditing}>x</button> */}
  //       <Link to="/VocabEditTable">
  //         <button onClick={handleDeckClick} id={deck.id.toString()}>Edit</button>
  //       </Link> 
  //       </span>
  //     </div>
  //   }
  // })


  const refetchDecks = () => {
    console.log("refetching");
    fetchDecks();
  }
    
  const languagesDropdownJSX = allLanguages.map(lang => {
      return (
          <option value={lang.id.toString()}>{lang.name.toString()}</option>
      )
  });
  
  const chooseLanguageDropdown = (
      <>
          <label>
              <select name="languages" id="languageDropDown" value={curLanguageIndex} onChange={e => setCurLanguageIndex(e.target.value)}>
                  {languagesDropdownJSX}
              </select> 
          </label>
      </>
  )

  const addFlashCard = (flashCard) => {
    const updatedFlashCards = [...curDeck.flashCards, flashCard];
    for (let card of updatedFlashCards){
      console.log("card " + card.wordText)
    }
    const newCurDeck = new Deck(curDeck.id, curDeck.name, curDeck.languageId, updatedFlashCards)
    saveCurDeck(newCurDeck);
  }

  const saveCurDeck = async deck => {
		try {
      console.log("curDeck.id " + deck.id);
			await fetch('http://localhost:8080/decks/' + deck.id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify(deck),
			});
      console.log('http://localhost:8080/decks/' + deck.id);
		} catch (error) {
			console.error(error.message);
		}
    refetchDecks();
	};

  const deleteDeck = async deckId =>{
    console.log("Id of deck to delete " + deckId)
		try {
      console.log("curDeck.id " + deckId);
			await fetch('http://localhost:8080/decks/' + deckId, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				}
			});
      console.log('http://localhost:8080/decks/' + deckId);
		} catch (error) {
			console.error(error.message);
		}
    refetchDecks();
  }
  
  const addDeck = async deckName => {
    let newDeck = new Deck(
      0,
      deckName,
      curLanguageIndex,
      []
    )
		try {
      console.log("curDeck.id " + deckName);
			await fetch('http://localhost:8080/decks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify(newDeck),
			});
      console.log('http://localhost:8080/decks/');
		} catch (error) {
			console.error(error.message);
		}
    refetchDecks();
	};

  return (
    <>
      <Router>
        <Header />
        <div>{chooseLanguageDropdown}</div>
        {!loading &&
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route element={<ProtectedRoutes/>}>
          wholeDeck, dueDeck, handleBackToMenu
            <Route path="/" element={<Home allLanguages={allLanguages} allDecks={allDecks}/>} />
            <Route path="/Study" element={<Study allDecks={allDecks} curLanguageIndex={curLanguageIndex} handleDeckClick={handleDeckClick} handleDeckEditClick={handleDeckEditClick} deleteDeck={deleteDeck} addDeck={addDeck}/>} />
            <Route path="/Read" element={<EBookDisplay />} />
            <Route path="/AddWordForm" element={<AddWordForm getWordData={addFlashCard} />} />
            <Route path="/VocabEditTable" element={<VocabTable deck={curDeck} returnNewData={saveCurDeck}/>} />
            <Route path="/EditList" element={<DeckEditList deck={curDeck} returnNewData={saveCurDeck}/>} />
            <Route path="/Quiz" element={<Quiz wholeDeck={curDeck} dueDeck={curDue} refetchDecks={refetchDecks}/>} />
            <Route path="/resources/" element={<Resources />} />
            <Route path="/about/" element={<About />} />
          </Route>

        </Routes>}
        <Footer />
      </Router>
    </>
  );
}

export default App
