import React, { useEffect, useState } from "react";
import AddWordForm from "./AddWordForm";

const CreateFromStash = ({props}) =>{
    const [vocabStash, setVocabStash] = useState([])

    useEffect(() => {
        setVocabStash(localStorage.getItem('vocabStash'));
    }, [])
    useEffect(() => {
        console.log("vocab stash: ");
        console.log(vocabStash);
    }, vocabStash)

    const handleGetCard = (card) =>{
        console.log(card)
    }
    return (
        <AddWordForm getWordData={handleGetCard}/>
    )
}

export default CreateFromStash;