import  {React,useEffect, useState} from 'react';

const Card = ({currentCard, showAnswer}) => {

    return (
        <div className="card">
            {<span className="word">Question: {currentCard.wordText}</span>}
			{showAnswer && (
                <div className="answer">
                    <span>answer: </span>
                    <img className="mnemonic-image" src={currentCard.imageUrl}/>
                    <audio autoPlay src={currentCard.soundfilePath}></audio>
                </div>
			)}
        </div>
    );
}

export default Card;