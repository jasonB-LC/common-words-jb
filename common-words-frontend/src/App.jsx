
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './Global.css'
import Home from "./components/Home";
import Resources from './components/Resources';
import About from './components/About';
import { Deck, FlashCard } from './classes/Exports';
import { useEffect, useState } from "react";

function App() {
	const [allDecks, setAllDecks] = useState([]);
	const [allFlashCards, setAllFlashCards] = useState([]);

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
      let newDeck = new Deck(
        deck.id,
        deck.name
      );
      let flashCards = [];
      deck.flashCards.forEach(flashCard => {
        flashCards.push(new FlashCard(flashCard.id, flashCard.daysUntilDue, flashCard.dateOfLastReview))
      });
      console.log(flashCards);
      decks.push(newDeck);
    });

    setAllDecks(decks);
  }

	useEffect(() => {
		fetchDecks();
	}, []);


  useEffect(() => {
		console.log("allDecks " + allDecks);
	}, [allDecks]);
	// useEffect(() => {
	// 	if (
	// 		allArtworks.length > 0 &&
	// 		allArtists.length > 0 &&
	// 		allCategories.length > 0
	// 	) {
	// 		setLoading(false);
	// 	}
	// }, [allUsers, allDecks, allFlashCards, allCategories]);
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources/" element={<Resources />} />
          <Route path="/about/" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App