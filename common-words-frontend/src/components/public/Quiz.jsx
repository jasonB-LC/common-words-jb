import {getRandomNum} from '../common/utils.js';
import {useState, useEffect}from 'react';
import Card from '../common/Card.jsx';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const Quiz = ({wholeDeck, dueDeck, refetchDecks}) => {
    //Page where the flashcard quiz takes place.
    const navigate = useNavigate();
    const [flashCards, setAllFlashCards] = useState(
		wholeDeck.flashCards.map(card => {
			return { ...card};
		})
	);
    const [curFlashCard, setCurrentFlashCard] = useState();
    const [previousCardIndex, setPreviousCardIndex] = useState(1);
    const [showAnswer, setShowAnswer] = useState(false);
    const [stillDue, setStillDue] = useState(
		dueDeck.map(card => {
			return { ...card};
		})
    );

    useEffect(() => {
        setCurrentFlashCard(getRandomFlashCard());
    }, []);

    useEffect(() => {
        setCurrentFlashCard(getRandomFlashCard());
    }, [stillDue]);
    
    useEffect(() => {
        setShowAnswer(false);
    }, [curFlashCard])

    const getRandomFlashCard = () =>{
        let num = 0;
        if (stillDue.length > 1){
            do{
                num = getRandomNum(0, stillDue.length - 1);
            }while(num === previousCardIndex);//we want to make sure we choose a random card that is different than the current card.
        }
        else if ((stillDue.length > 0)){
            num = 0;
        }
        else {
            return ""
        }
        
        setPreviousCardIndex(num);
        return stillDue[num];
    }

    const handleAnswerCorrect = () => {
        let updatedCards = flashCards.map(aCard => {
            return (
                aCard.id !== curFlashCard.id 
                ? aCard
                : {
                    ...aCard,
                    dateOfLastReview: Date.now(), 
                    daysUntilDue: 2.0
                }
            );
        })
        let updatedStillDue = stillDue.map(aCard => {
            return (
                aCard.id !== curFlashCard.id ? aCard : ""
            );
        })

        var filteredStillDue = updatedStillDue.filter(Boolean);
        setStillDue(filteredStillDue);
        setAllFlashCards(updatedCards);
        
    }

    const handleShowClicked = () => {
        setShowAnswer(true);
    }

    const handleAnswerIncorrect = () => {
        let updatedCards = flashCards.map(aCard => {
            return (
                aCard.id !== curFlashCard.id 
                ? aCard
                : {
                    ...aCard,
                    dateOfLastReview: Date.now(), 
                    daysUntilDue: 0.0
                }
            );
        })
        setAllFlashCards(updatedCards);
        setCurrentFlashCard(getRandomFlashCard());
    }

	const saveDeck = async deck => {
		try {
			await fetch('http://localhost:8080/decks/' + wholeDeck.id, {
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
        navigate('/Study');
	};

	const handleSubmit = event => {
		event.preventDefault();
		let newDeck = { ...wholeDeck, flashCards: 
            flashCards
        };
		saveDeck(newDeck);

	};

    const quizControl = (
        <div className="quiz-control">
            {!showAnswer
                ? <div>{curFlashCard && <button onClick={handleShowClicked}>Show</button>}</div>
                : <div className="grade-buttons">
                    <button onClick={handleAnswerCorrect}>Correct</button>
                    <button onClick={handleAnswerIncorrect}>Incorrect</button>
                </div>
            }
            <Link to="/Study">
                <button type="button" onClick={handleSubmit}>Back</button>
            </Link>
        </div>
    )

    return (
        <div className="quiz">
            {curFlashCard ? <Card currentCard={curFlashCard} showAnswer={showAnswer}/> : "All Caught Up"}  
            {quizControl}
        </div>
    );
}

export default Quiz;