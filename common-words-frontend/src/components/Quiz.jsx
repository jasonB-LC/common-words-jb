import {getRandomNum} from './common/utils.js';
import {useState, useEffect}from 'react';
import Card from './common/Card.jsx';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const Quiz = ({wholeDeck, dueDeck}) => {
    const navigate = useNavigate();
    const [curWord, setCurrentWord] = useState();
    const [previousWordIndex, setPreviousWordIndex] = useState(1);
    const [showAnswer, setShowAnswer] = useState(false);
	const [allWords, setAllWords] = useState(
		wholeDeck.flashCards.map(obj => {
			return { ...obj};
		})
	);
    const [stillDue, setStillDue] = useState(
		dueDeck.flashCards.map(obj => {
			return { ...obj};
		})
    );

    useEffect(() => {
        setCurrentWord(getRandomWord());
    }, []);

    useEffect(() => {
        setCurrentWord(getRandomWord());
    }, [stillDue]);
    
    useEffect(() => {
        setShowAnswer(false);
    }, [curWord])

    const getRandomWord = () =>{
        let num = 0;
        if (stillDue.length > 1){
            do{
                num = getRandomNum(0, stillDue.length - 1);
            }while(num === previousWordIndex);
        }
        else if ((stillDue.length > 0)){
            num = 0;
        }
        else {
            return ""
        }
        
        setPreviousWordIndex(num);
        return stillDue[num];
    }

    const handleAnswerCorrect = () => {
        let updatedWords = allWords.map(aWord => {
            return (
                aWord.id !== curWord.id 
                ? aWord
                : {
                    ...aWord,
                    dateOfLastReview: Date.now(), 
                    daysUntilNextReview: 2.0
                }
            );
        })
        let updatedStillDue = stillDue.map(aWord => {
            return (
                aWord.id !== curWord.id ? aWord : ""
            );
        })

        var filteredStillDue = updatedStillDue.filter(Boolean);
        setStillDue(filteredStillDue);
        setAllWords(updatedWords);
        
    }

    const handleShowClicked = () => {
        setShowAnswer(true);
    }

    const handleAnswerIncorrect = () => {
        let updatedWords = allWords.map(aWord => {
            return (
                aWord.id !== curWord.id 
                ? aWord
                : {
                    ...aWord,
                    dateOfLastReview: Date.now(), 
                    daysUntilNextReview: 0.0
                }
            );
        })
        setAllWords(updatedWords);
        setCurrentWord(getRandomWord());
    }

    // const sendBackDeckInfo = () => {
    //     handleBackToMenu(allWords);
    // }
	const saveDeck = async deck => {
        console.log("deck.id " + wholeDeck.id);
		try {
            console.log(deck);
			await fetch('http://localhost:8080/decks/' + wholeDeck.id, {
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
		//refetch();
        navigate('/Study');

	};
    const isValid = () => {
        return true;
    }
	const handleSubmit = event => {
		event.preventDefault();
		let newDeck = { ...wholeDeck, languageId: 2, flashCards: [
            {
                "id": 6,
                "properties": [],
                "daysUntilDue": 0,
                "dateOfLastReview": 3
            },
            {
                "id": 7,
                "properties": [],
                "daysUntilDue": 0,
                "dateOfLastReview": 7655
            },
            {
                "id": 16,
                "properties": [],
                "daysUntilDue": 0,
                "dateOfLastReview": 1111
            }
        ]};
		if (!isValid(newDeck)) {
            console.log("not valid")
			//setHasErrors(true);
		} else {
			saveDeck(newDeck);
		}
	};
    const quizControl = (
        <div className="quiz-control">
            {!showAnswer
                ? <div>{curWord && <button onClick={handleShowClicked}>Show</button>}</div>
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
            {curWord ? <Card currentWord={curWord} showAnswer={showAnswer}/> : "All Caught Up"}  
            {quizControl}
        </div>
    );
}

export default Quiz;