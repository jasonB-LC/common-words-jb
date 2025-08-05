import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Main = ({allLanguages, curLanguage, setLanguage, addLanguage}) => {
    const [showAddLanguageInput, setShowAddLanguageInput] = useState(false)
    const [curLanguageIndex, setCurLanguageIndex] = useState(0);
    const [newLanguage, setNewLanguage] = useState("");

    useEffect (() => {
        setCurLanguageIndex(curLanguage);
    }, [])

    const showLanguageInput = () => {
        setShowAddLanguageInput(!showAddLanguageInput);
    }
    
    const languagesDropdownJSX = allLanguages.map(lang => {
        return (
            <option value={lang.id.toString()}>{lang.name.toString()}</option>
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
        <>
            <label>
                <select name="languages" id="languageDropDown" value={curLanguageIndex} onChange={setLanguage}>
                    {languagesDropdownJSX}
                </select> 
                <button onClick={showLanguageInput}>{showAddLanguageInput ? "close" : "add language"}</button>
                {showAddLanguageInput && 
                    <>
                    <form>
                       <input type="text" value={newLanguage} onChange={handleChange}/> <button type="submit" onClick={handleLanguageSubmit}>submit</button>
                    </form>
                    </>
                }
            </label>
        </>
    )

    return (
        <>
            {chooseLanguageDropdown}
            <div>
                Welcome to common words.
            </div>
            <div>
                On the study page, you can add new cards to the existing decks, or create your own. Have fun!
            </div>
            <Link to="/Study">
                <button type="button">Study</button>
            </Link>
        </>
    );
}

export default Main;