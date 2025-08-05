
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './Global.css'
import Main from "./components/public/Main";
import Resources from './components/public/Resources';
import About from './components/public/About';
import { Language, Deck, FlashCard } from './classes/Exports';
import { useEffect, useState } from "react";
import Study from "./components/public/Study";
import ProtectedRoutes from "./components/admin/ProtectedRoutes";
import Login from "./components/admin/Login";
import Header from "./components/public/Header";
import Footer from "./components/public/Footer";
import Quiz from "./components/public/Quiz";
import AddWordForm from "./components/public/AddWordForm";
import DeckEditList from "./components/public/DeckEditList";
import DeckChosen from "./components/admin/DeckChosen";

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

  const fetchLanguages = async () => {//fetching all languages from back end
    let languages = [];

    let response;
    let data;
    
    try {
      response = await fetch('http://localhost:8080/languages');
      data = await response.json();
      
    } catch (error) {
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

  const fetchDecks = async () => {//fetching all decks from back end
    let decks = [];

    let response;
    let data;
    
    try {
      response = await fetch('http://localhost:8080/decks');
      data = await response.json();
      
    } catch (error) {
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

  const wordIsReadyForReview = (word) => {//boolean function used to populate the deck of cards that are due to be reviewed.
      let TodaysDate = Date.now();
      let timeElapsedMS = TodaysDate - word.dateOfLastReview;
      let timeUntilNextReviewMS = oneDayMS * word.daysUntilDue;
      return timeElapsedMS > timeUntilNextReviewMS
  };

  const handleDeckClick = (event) => {//responds to user's choice of deck
    allDecks.map((deck) => {
        if (event.target.id == deck.id){
          setCurDeck(deck);
        }
    })
  }

  const handleDeckEditClick = (deckId) => {//setting the current deck to prepare it to be edited
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
	}, [allLanguages, allDecks]);

  const refetchDecks = () => {
    fetchDecks();
  }
  
  const refetchLanguages = () => {
    fetchLanguages();
    fetchDecks();
  }
  const setLanguage = (e) => {
    console.log("e.target.value " + e.target.value);
    setCurLanguageIndex(e.target.value)
  }

  const addFlashCard = (flashCard) => {
    const updatedFlashCards = [...curDeck.flashCards, flashCard];
    const newCurDeck = new Deck(curDeck.id, curDeck.name, curDeck.languageId, updatedFlashCards)
    saveCurDeck(newCurDeck);
  }

  const updateFlashCard = (updatedFlashCard) => {
    const updatedFlashCards = curDeck.flashCards.map((flashCard) =>{
      if (parseInt(flashCard.id) === parseInt(updatedFlashCard.id)){
        return updatedFlashCard;
      }
      else {
        return flashCard;
      }
    })

    const newCurDeck = new Deck(curDeck.id, curDeck.name, curDeck.languageId, updatedFlashCards)
    saveCurDeck(newCurDeck);
  }

  const saveCurDeck = async deck => {//saving our currently updated deck to our database
		try {
			await fetch('http://localhost:8080/decks/' + deck.id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify(deck),
			});
		} catch (error) {
			console.error(error.message);
		}
    refetchDecks();
	};

  const deleteDeck = async deckId =>{//delete a deck from the database
		try {
			await fetch('http://localhost:8080/decks/' + deckId, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				}
			});
		} catch (error) {
			console.error(error.message);
		}
    refetchDecks();
  }
  
  const addLanguage = async languageName => {//add a new deck to the database
    let newLanguage = new Deck(
      0,
      languageName
    )
		try {
			await fetch('http://localhost:8080/languages', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify(newLanguage),
			});
		} catch (error) {
			console.error(error.message);
		}
    refetchLanguages();
	};
  
  const addDeck = async deckName => {//add a new deck to the database
    let newDeck = new Deck(
      0,
      deckName,
      curLanguageIndex,
      []
    )
		try {
			await fetch('http://localhost:8080/decks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify(newDeck),
			});
		} catch (error) {
			console.error(error.message);
		}
    refetchDecks();
	};

  return (
    <>
      <Router>
        <Header />
        {!loading &&
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/" element={<Main allLanguages={allLanguages} curLanguageIndex={curLanguageIndex} setLanguage={setLanguage} addLanguage={addLanguage}/>} />
            <Route path="/Study" element={<Study allDecks={allDecks} curLanguageIndex={curLanguageIndex} handleDeckClick={handleDeckClick} handleDeckEditClick={handleDeckEditClick} deleteDeck={deleteDeck} addDeck={addDeck}/>} />
            <Route element={<DeckChosen curDeck/>}>
              <Route path="/AddWordForm" element={<AddWordForm getWordData={addFlashCard} />} />
              <Route path="/EditList" element={<DeckEditList deck={curDeck} returnNewDeck={saveCurDeck} updateFlashCard={updateFlashCard}/>} />
              <Route path="/Quiz" element={<Quiz wholeDeck={curDeck} dueDeck={curDue} refetchDecks={refetchDecks}/>} />
            </Route>
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
