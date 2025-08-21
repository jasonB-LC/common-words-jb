import {useEffect, useState} from 'react';
import '../../../style/dropdown.css';
import Dropdown from '../../common/dropdown';

const AddDeckButton = ({text, handleNewListItem, sendBackEditingStatus, saveNewLanguage, curLanguages}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingLanguage, setIsAddingLanguage] = useState(false);
    const [itemName, setItemName] = useState("");
    const [curLanguageIndex, setCurLanguageIndex] = useState(0);
    const [newLanguage, setNewLanguage] = useState("")

    useEffect(() => {
        sendBackEditingStatus(false);
    }, [])
    useEffect(() => {
        sendBackEditingStatus(isEditing)
    }, [isEditing])

    const setEditingTrue = () => {
        setIsEditing(true);
    }
    const saveDeckAndReturn = () => {
        if (itemName && curLanguageIndex){
            handleNewListItem(itemName, curLanguageIndex);
            setItemName("");
            setIsEditing(false);
        }

    }
    const goBack = () => {
        setIsEditing(false);
        setItemName("");
    }
    const handleChange = (e) => {
        setItemName(e.target.value)
    }
    const handleLangFieldUpdate = (e) => {
        setNewLanguage(e.target.value)
    }
    const handleAddingLanguage = () => {
        if (isAddingLanguage){
            if(newLanguage){
                console.log(newLanguage)
                saveNewLanguage(newLanguage);

            }
        }
        setIsAddingLanguage(!isAddingLanguage);
    }
    const handleCurLanguageChange = (option) => {
        console.log(option.value)
        setCurLanguageIndex(option.value)
    }
    const curLanguagesJSX = (
        curLanguages.map((nextLanguage) => {
            return ({value: nextLanguage.id, label: nextLanguage.name})
        })
    )
    return (
        <span >
            {isEditing 
                ? <span>
                        <div>Create Deck </div>
                        <div className="form-column">
                            <div className='form-row'>
                                <label>name: </label>
                                <input type="text" onChange={handleChange}></input>
                            </div>
                            <div className='form-row'>
                                <label>language: </label>
                                <Dropdown options={curLanguagesJSX} onSelect={handleCurLanguageChange}/>
                            </div>
                            <div className='form-row'>
                                <label></label>
                                <button className="add-button" onClick={handleAddingLanguage}>
                                    {!isAddingLanguage ? "+" : "add"}
                                </button>
                                {!isAddingLanguage ? "new language" :
                                <input type="text" onChange={handleLangFieldUpdate}></input>}
                            </div>
                        </div>
                        <button className="add-button" onClick={goBack}>back</button>
                        <button className="add-button" onClick={saveDeckAndReturn}>save</button> 
                    </span>
                : <span><button className="add-button" onClick={setEditingTrue}>+</button> {text}</span>}
                 
        </span>
    );
}

export default AddDeckButton;