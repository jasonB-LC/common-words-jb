import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import EditForm from './EditForm';

const DeckEditList = ({deck, returnNewData}) => {
    const [tableData, setTableData] = useState();

    const navigate = useNavigate();
    const [soundfilesToAdd, setSoundfilesToAdd] = useState([]);
    const [soundfilesToDelete, setSoundfilesToDelete] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentCardEdited, setCurrentCardEdited] = useState({wordText: "", imageUrl: "", soundfilePath: ""})
    const removeRow = (e) =>{
        const table = document.getElementById('vocabList');
        const rows = table.querySelectorAll('tr');
        for (let row of rows){
            if (e.target.id === row.id){
                for (let column of row.querySelectorAll("td")){
                    if (column.className === "soundfile-cell"){
                        setSoundfilesToDelete([...soundfilesToDelete, column.textContent])
                        console.log("soundfile name: " + column.textContent);
                    }
                }
                deleteSoundfile
                table.deleteRow(Number(row.rowIndex));
            }
        }
    }

    const handleSoundfileChange = (e) => {
        console.log("here" + e.target.id)
        const table = document.getElementById('vocabList');
        const rows = table.querySelectorAll('tr');
        for (let row of rows){
            if (e.target.id === row.id){
                console.log("row " + row.id)
                for (let column of row.querySelectorAll("td")){
                    if (column.className === "soundfile-cell"){
                        column.innerHTML = column.id;
                        console.log("blah " + column.innerHTML)
                        console.log("blah " + column.id)
                        // setSoundfilesToDelete([...soundfilesToDelete, column.textContent])
                        // console.log("soundfile name: " + column.textContent);
                    }
                }
                deleteSoundfile
                table.deleteRow(Number(row.rowIndex));
            }
        }

    }

    const editRow = (e) =>{
        setShowEditForm(true);
        const dummy = deck.flashCards.map((word) => {
            if (word.id === e.target.id){
                setCurrentCardEdited({"wordText": word.wordText, "imageUrl": word.imageUrl, "soundfilePath": word.soundfilePath});
            }
        })

    }

    const wordsJSX = deck.flashCards.map((word) => 
        {
            return <tr id={word.id}>
                <td name="wordText"><div contenteditable="false" spellCheck="false" readonly>{word.wordText}</div></td>
                <td className="image-cell" name="imageUrl"><div contenteditable="false" spellCheck="false" readonly>{word.imageUrl}</div></td>
                <td className="soundfile-cell" name="soundfilePath"><div contenteditable="false" spellcheck="false" readonly>{word.soundfilePath}</div></td>
                <td><button className="edit-row-small" onClick={editRow} id={word.id}>edit</button></td>
                <td><button className="final-delete-button-small" onClick={removeRow} id={word.id}>x</button></td>
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
            for(let key of Object.keys(deck.flashCards[i-1])){
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
                    newWord[key] = deck.flashCards[i-1][key];
                }
            }
            newFlashCards.push(newWord);
        }
        const newDeck = {...deck, flashCards: newFlashCards}
        for (let file of soundfilesToDelete){
            deleteSoundfile(file)
            console.log("file: " + file);
        }
        returnNewData(newDeck);
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
            if (response.ok){
                console.log("delete successful");
            }
		} catch (error) {
            console.log("couldn't delete file:" + soundfile);
			console.error(error.message);
		}
}

    const revertChanges = () =>{
        returnNewData(deck);
        navigate("/Study");
    }

    return (
        <>
            {showEditForm ? <EditForm originalWord={currentCardEdited}/> : tableJSX}
            <button onClick={submitChanges}>save changes</button>
            <button onClick={revertChanges}>revert</button>
        </>
    );
}

export default DeckEditList;