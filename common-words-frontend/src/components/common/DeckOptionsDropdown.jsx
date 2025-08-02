import { useState, useEffect } from "react";

const DeckOptionsDropdown = ({deckId, onClick}) => {
    const [optionSelected, setOptionSelected] = useState(0);
    useEffect(()=>{
        onClick(deckId, optionSelected);
    }, [optionSelected]);

    return (
        <>
            <label>
                <select name="deckOptions" id={deckId} value={optionSelected} onChange={e => setOptionSelected(e.target.value)}>
                    <option value="" selected>options</option>
                    <option value="addWord">add word</option>
                    <option value="edit">edit</option>
                    <option value="deleteDeck">delete deck</option>
                </select> 
            </label>
        </>
    )
}

export default DeckOptionsDropdown;

