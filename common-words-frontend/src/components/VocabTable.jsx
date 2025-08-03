import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import SoundfileSelection from './common/SoundfileSelection';

const VocabTable = ({deck, returnNewData}) => {
    const [tableData, setTableData] = useState();

    const navigate = useNavigate();
    const [soundfilesToAdd, setSoundfilesToAdd] = useState([]);
    const [soundfilesToDelete, setSoundfilesToDelete] = useState([]);
    
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
    const wordsJSX = deck.flashCards.map((word, wordKey) => 
        {
            return <tr id={wordKey}>
                <td name="wordText"><div contenteditable="true" spellCheck="false">{word.wordText}</div></td>
                <td className="image-cell" name="imageUrl"><div contenteditable="true" spellCheck="false">{word.imageUrl}</div></td>
                <td className="soundfile-cell" name="soundfilePath"><div contenteditable="true" spellcheck="false">{word.soundfilePath}</div></td>
                {/* <td className="soundfile-cell" name="soundfilePath"><input type="file" name="soundfilePath" id="soundfilePath"/></td> */}
                <td className="soundfile-cell-selection" name="soundfile-cell-selection" id={word.soundfilePath}>
                    <input type="file" id={"soundfile" + wordKey} style={{display: "none"}} onChange={handleSoundfileChange} ></input>
                    <label for={"soundfile" + wordKey} class="custom-file-button">Choose File</label>
                    <span id="fileDisplayName">No file chosen</span>
                </td>
                
                <td><button className="final-delete-button-small" onClick={removeRow} id={wordKey}>x</button></td>
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
            {tableJSX}
            <button onClick={submitChanges}>save changes</button>
            <button onClick={revertChanges}>revert</button>
        </>
    );
}

export default VocabTable;