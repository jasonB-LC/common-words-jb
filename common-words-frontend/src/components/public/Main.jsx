import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Buffer from "../common/Buffer";
import AddLanguageForm from "../common/AddLanguageForm";

const Main = ({allLanguages, curLanguage, setLanguage, addLanguage}) => {
    const [showAddLanguageInput, setShowAddLanguageInput] = useState(false)
    const [curLanguageIndex, setCurLanguageIndex] = useState(0);
    const [newLanguage, setNewLanguage] = useState("");

    useEffect (() => {
        setCurLanguageIndex(curLanguage);
    }, [])

    const updateLanguage = (e) => {
        setLanguage(e); //TODO: Dropdown has a mind of it's own, doesn't remember curLanguage when returning to main
                        //Maybe this will fix itself when I update the style with a custom dropdown.
        setCurLanguageIndex(e.target.value);
    }
    const showLanguageInput = () => {
        setShowAddLanguageInput(true);
    }
    const hideLanguageInput = () => {
        setShowAddLanguageInput(false);
    }
    const languagesDropdownJSX = allLanguages.map(lang => {
        return (
            <option key={lang.id} value={lang.id.toString()}>{lang.name.toString()}</option>
        )
    });

    const handleChange = (e) => {
        setNewLanguage(e.target.value);
    }

    const handleLanguageSubmit = (e) => {
        addLanguage(newLanguage); 
        setShowAddLanguageInput(false);
    }


    const chooseLanguageDropdown = (//for setting the current language            
            <label className="add-language-label">
                {allLanguages && !showAddLanguageInput && <select className ="language-dropdown" name="languages" id="languageDropDown" value={curLanguageIndex} onChange={updateLanguage}>
                    {languagesDropdownJSX}
                </select> }
                {allLanguages && !showAddLanguageInput && <button className="addLanguage" onClick={showLanguageInput}>+</button>}
                {showAddLanguageInput && <AddLanguageForm newLanguage={newLanguage} handleChange={handleChange} handleLanguageSubmit={handleLanguageSubmit} handleLanguageBack={hideLanguageInput}/>}
            </label>

    )

    return (
        <div className="page-container">
            <Buffer></Buffer>
            <div className="center-content">
            {chooseLanguageDropdown}
                <div>
                    Welcome to common words.
                </div>
                <div>
                    On the study page, you can add new cards to the existing decks, or create your own. Have fun!
                </div>
                <Link to="/Read">
                    <button type="button">Read</button>
                </Link>
                <Link to="/Study">
                    <button type="button">Study</button>
                </Link>
            </div>
            <Buffer></Buffer>
        </div>
    );
}

export default Main;