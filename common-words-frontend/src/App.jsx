
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './Global.css'
import Home from "./components/public/Home";
import Resources from './components/Resources';
import About from './components/About';
import { Language, Deck, FlashCard } from './classes/Exports';
import { useEffect, useState } from "react";
import Study from "./components/public/Study";
import Main from "./components/Main";
import ProtectedRoutes from "./components/admin/ProtectedRoutes";
import Login from "./components/admin/Login";
import { useImmer } from 'use-immer';
import Header from "./components/Header";
import Footer from "./components/Footer";
import TraversalButton from "./components/TraversalButton";
import Quiz from "./components/Quiz";
import { Link } from "react-router-dom";
import AddWordForm from "./components/AddWordForm";

function App() {
  const oneDayMS = 86400000;
  const [loading, setLoading] = useState(true);
  const [allLanguages, setAllLanguages] = useState([]);
	const [allDecks, setAllDecks] = useState([]);
  const [curDeck, setCurDeck] =  useState({});
  const [curDue, setCurDue] = useState([])
	const [allFlashCards, setAllFlashCards] = useState([]);
  const [curLanguageIndex, setCurLanguageIndex] = useState(2);
  
  useEffect(()=>{
    console.log("curLanguageIndex: " + curLanguageIndex);

  }, [curLanguageIndex])
  
  useEffect(() => {
    if (curDeck.name){
      console.log("curDeck.name" + curDeck.name)
        let deckToStudy = curDeck.flashCards.filter((word) => {
            return wordIsReadyForReview(word);
        })
        let dts = deckToStudy.map((card) => {return card})
        console.log("deckToStudy" + dts)
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
              console.log("deck.name " + deck.name)
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

  const decksJSX = allDecks.map(deck => {
    if (parseInt(deck.languageId) === parseInt(curLanguageIndex)){
      return <div>
        <Link to="/Quiz">
          <TraversalButton onClick={handleDeckClick} id={deck.id.toString()} text={deck.name}/>
        </Link>
        <span>Total: {deck.flashCards.length}  
        Due: {deck.flashCards.filter((word) => {
            return wordIsReadyForReview(word);
        }).length} 
        <Link to="/AddWordForm">
          <button onClick={handleDeckClick} id={deck.id.toString()}>Add Word</button>
        </Link>        {/* <button className='delete-button' onClick={showPopUpTrue} name={deck.name + " Deck"}  id={deck.id.toString()} disabled={isEditing}>x</button> */}
        </span>
      </div>
    }
  })


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
    setCurDeck({...curDeck, flashCard})
    saveCurDeck(curDeck);
  }

  const saveCurDeck = async deck => {
		try {
			await fetch('http://localhost:8080/decks/' + curDeck.id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify(deck),
			});
            console.log('http://localhost:8080/decks/' + wholeDeck.id);
		} catch (error) {
			console.error(error.message);
		}
        refetchDecks();
        navigate('/Study');

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
            <Route path="/Study" element={<Study curDecksJSX={decksJSX}/>} />
            <Route path="/AddWordForm" element={<AddWordForm getWordData={addFlashCard}/>} />
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
