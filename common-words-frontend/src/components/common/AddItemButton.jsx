import {useEffect, useState} from 'react';
const AddItemButton = ({text, handleNewListItem, sendBackEditingStatus}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [itemName, setItemName] = useState("");

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
        if (itemName){
            handleNewListItem(itemName);
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

    return (
        <span >
            {isEditing 
                ? <span>
                        <button className="add-button" onClick={goBack}>back</button>
                        <button className="add-button" onClick={saveDeckAndReturn}>save</button> <input type="text" onChange={handleChange}></input>
                    </span>
                : <span><button className="add-button" onClick={setEditingTrue}>+</button> {text}</span>}
                 
        </span>
    );
}

export default AddItemButton;