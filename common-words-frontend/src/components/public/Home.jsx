import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";
import data from '../../data/initLanguageData.json';
import { useEffect, useState } from "react";
import Study from "./Study";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import StyledLink from "../StyledLink";
import { Link } from "react-router-dom";
import TraversalButton from "../TraversalButton";

const Home = ({allLanguages, allDecks}) => {
    const oneDayMS = 86400000;
    
    const [branchChosen, setBranchChosen] = useState(false);

    const handleDeckClick = (event) => {
        console.log(event);
    }
    const wordIsReadyForReview = (word) => {
        let TodaysDate = Date.now();
        let timeElapsedMS = TodaysDate - word.dateOfLastReview;
        let timeUntilNextReviewMS = oneDayMS * word.daysUntilDue;
        return timeElapsedMS > timeUntilNextReviewMS
    };
    // const decksJSX2 = allDecks.map(deck => {
    //     return <div>
    //         <TraversalButton onClick={handleDeckClick} id={deck.id.toString()} text={deck.name}/>
    //         <span>Total: {deck.flashCards.length}  
    //         Due: {deck.flashCards.filter((word) => {
    //             return wordIsReadyForReview(word);
    //         }).length} 
    //         {/* <button className='delete-button' onClick={showPopUpTrue} name={deck.name + " Deck"}  id={deck.id.toString()} disabled={isEditing}>x</button> */}
    //         </span>
    //     </div>
    // })

    const handleStudyClick = (event) => {
        setBranchChosen(true);
    }
    const handleBack = (event) => {
        setBranchChosen(false);
    }
    return (
        <>
            <div>
                <Link to="/Read">
                    <button type="button">Read</button>
                </Link>
                <Link to="/Study">
                    <button type="button">Study</button>
                </Link>
                </div>
        </>
        
        
    );
}

export default Home;