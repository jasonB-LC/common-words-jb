import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import EditForm from './EditForm';
import DeletePopUp from '../common/DeletePopUp';

const DeckEditList = ({deck, returnNewDeck, updateFlashCard}) => {
    const [tableData, setTableData] = useState();

    const navigate = useNavigate();
    const [soundfilesToDelete, setSoundfilesToDelete] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentCardEdited, setCurrentCardEdited] = useState({id: "", wordText: "", imageUrl: "", soundfilePath: ""})
    const [flashCards, setFlashCards] = useState([])
    const [flashCardsToReturn, setFlashCardsToReturn] = useState([])
    const [showingPopUp, setShowingPopUp] = useState({showing: false, name: "", id: ""});
    const [isDeleting, setIsDeleting] = useState(false);

    const removeRow = (e) =>{
        const table = document.getElementById('vocabList');
        const rows = table.querySelectorAll('tr');
        for (let row of rows){
            if (e.target.id === row.id){
                for (let column of row.querySelectorAll("td")){
                    if (column.className === "soundfile-cell"){
                        setSoundfilesToDelete([...soundfilesToDelete, column.textContent])
                    }
                }
                table.deleteRow(Number(row.rowIndex));
                setCurrentCardEdited({id: "", wordText: "", imageUrl: "", soundfilePath: ""});
                showPopUpFalse();
                submitChanges();
            }
        }
    }
    const showPopUpTrue = (e) =>{
        let cardText = "";
        flashCards.map((word) => {
            if (parseInt(word.id) === parseInt(e.target.id)){
                cardText = word.wordText;
            }
        })

        setShowingPopUp({showing: true, name: cardText, id: e.target.id});
        setIsDeleting(true);
    }

    const showPopUpFalse = () => {
        setShowingPopUp({showing: false, name: "", id: ""});
        setIsDeleting(false);
    }

    useEffect(() => {
        setFlashCards(deck.flashCards);
    }, [])
    // useEffect(() => {
    //     setFlashCardsToReturn(flashCards);
    // }, [flashCards]);

    useEffect(() => {
        setFlashCards(deck.flashCards);
    }, [deck])

    useEffect(() => {
        if (currentCardEdited.wordText){
            setShowEditForm(true);
        }
    }, [currentCardEdited])

    const editRow = (e) =>{
        flashCards.map((word) => {
            if (parseInt(word.id) === parseInt(e.target.id)){
                setCurrentCardEdited({"id": word.id, "wordText": word.wordText, "imageUrl": word.imageUrl, "soundfilePath": word.soundfilePath});
            }
        })
    }

    const wordsJSX = flashCards.map((word) => 
        {
            return <tr id={word.id}>
                <td name="wordText"><div contenteditable="false" spellCheck="false" readonly>{word.wordText}</div></td>
                <td className="image-cell" name="imageUrl"><div contenteditable="false" spellCheck="false" readonly>{word.imageUrl}</div></td>
                <td className="soundfile-cell" name="soundfilePath"><div contenteditable="false" spellcheck="false" readonly>{word.soundfilePath}</div></td>
                <td><button className="edit-row-small" onClick={editRow} id={word.id}>edit</button></td>
                <td><button className="final-delete-button-small" onClick={showPopUpTrue} id={word.id}>x</button></td>
            </tr>
        }
    )

    const tableJSX = <table id="vocabList">
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>Image</th>  
                                <th>Soundfile</th>                         
                            </tr>
                        </thead>
                        <tbody>
                            {wordsJSX}
                        </tbody>
                    </table>

    const submitChanges = () =>{
        const table = document.getElementById('vocabList');
        if (!table) {
            return;
        }
        const rows = table.querySelectorAll('tr');
        const newFlashCards = [];
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            const newWord = {}
            for(let key of Object.keys(flashCards[i-1])){
                let isMatch = -1;
                for (let j = 0; j <cells.length; j++){
                    if ( key === cells[j].getAttribute("name")){
                        isMatch = j;
                    }
                }
                if (isMatch > -1){
                    newWord[key] = cells[isMatch].textContent;
                }
                else {
                    newWord[key] = flashCards[i-1][key];
                }
            }
            newFlashCards.push(newWord);
        }
        const newDeck = {...deck, flashCards: newFlashCards}
        for (let file of soundfilesToDelete){
            deleteSoundfile(file)
        }
        returnNewDeck(newDeck);
        navigate("/Study");
    }  

    const deleteSoundfile = async (soundfile) => {
        try {
			const response = await fetch('http://localhost:8080/delete/' + soundfile, {
				method: 'DELETE',
				headers: {
					'Access-Control-Allow-Origin': '*',
				}
			});
		} catch (error) {
			console.error(error.message);
		}
}

    const hideForm = () =>{
        setShowEditForm(false);
    } 

    return (
        <>
            {showEditForm ? <EditForm originalWord={currentCardEdited} updateFlashCard={updateFlashCard} hideForm={hideForm}/> 
            : 
                <div>
                    {tableJSX}
                    {!isDeleting && <button onClick={submitChanges}>back</button>}
                </div>
            }
            {showingPopUp.showing && <DeletePopUp objectName={showingPopUp.name} eventId={showingPopUp.id} deletionRef={removeRow} abortRef={showPopUpFalse}/>}

        </>
    );
}

export default DeckEditList;