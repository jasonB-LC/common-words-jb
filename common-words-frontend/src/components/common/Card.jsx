const Card = ({currentCard, showAnswer}) => {
    return (
        <div className="card">
            {<span className="word">{currentCard.wordText}</span>}
			{showAnswer && (
                <div className="answer">
                    <img className="mnemonic-image" src={currentCard.imageUrl}/>
                    <audio autoPlay src={"http://localhost:8080/files/soundfiles/" + currentCard.soundfilePath}></audio>
                </div>
			)}
        </div>
    );
}

export default Card;