import  {React,useEffect, useState} from 'react';

const Card = ({currentCard, showAnswer}) => {
    
    return (
        <div className="card">
            {<span className="word">{currentCard.word}</span>}
			{showAnswer && (
                <div className="answer">
                    {currentCard.definition}
                    <img className="mnemonic-image" src={currentCard.image}/>
                    <audio autoPlay src={currentCard.soundfile}></audio>
                </div>
			)}
        </div>
    );
}

export default Card;