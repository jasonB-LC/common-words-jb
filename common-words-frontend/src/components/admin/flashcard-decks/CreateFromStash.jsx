import {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Dropdown from '../../common/dropdown';

const CreateFromStash = ({getWordData, curLanguages, curDecks}) => {
    const {register, handleSubmit, formState: { errors} } = useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const [curLanguageIndex, setCurLanguageIndex] = useState(0);
    const [curDeckIndex, setCurDeckIndex] = useState(0);
    const [vocabStash, setVocabStash] = useState([])
    const [positionInVocabArray, setPositionInVocabArray] = useState(0)
    const [showDropdownError, setShowDropdownError] = useState(false);
    const [localStorageLoaded, setLocalStorageLoaded] = useState(false);
    const [formData, setFormData] = useState({
        wordText: "",
        imageUrl: "",
        soundfilePath: "",
        daysUntilNextReview: 0,
        dateOfLastReview: Date.now()
    })
    useEffect(()=> {
        console.log(localStorage.getItem('vocabStash').split(","))
        setLocalStorageLoaded(true);
        setVocabStash(localStorage.getItem('vocabStash').split(","));
        
    },[])

    useEffect(()=>{
        if (localStorageLoaded) {
            if (vocabStash){
                formData.wordText=vocabStash[positionInVocabArray];
            }
            else {
                formData.wordText="";
            }
            localStorage.setItem('vocabStash', vocabStash)

        }
        console.log("vocabStash");
        console.log(vocabStash);

        
    },[vocabStash])
    
    useEffect(() => {
        setCurDeckIndex(0);
    }, [curLanguageIndex]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSoundfileChange = (e) => {//when user uploads a soundfile, cache the filename and file itself
        setSelectedFile(e.target.files[0]);
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: e.target.files[0].name,
        }));
        
    }

    const removeTermAtCurrentIndex = () =>{
        setVocabStash(vocabStash.map((word, index) => {
            if (index != positionInVocabArray){
                return word;
            }
        }).filter(Boolean));
        setFormData({
            wordText: "",
            imageUrl: "",
            soundfilePath: "",
            daysUntilNextReview: 0,
            dateOfLastReview: Date.now()
            }
        )

    }
    const sendData = async () =>{
        //saving the new flashCard to database. 
        //first we attempt to save soundfile, and if that is successful, we send the
        //data object to App.jsx to sava to the database.
        if (!curDeckIndex){
            setShowDropdownError(true);
            return;
        }
        setShowDropdownError(false);
        const soundfileFormData = new FormData();
        console.log("selected file: ")
        console.log(selectedFile)
        soundfileFormData.append("file", selectedFile);
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: soundfileFormData,
            });
            if (response.ok){
                setSelectedFile(null);
                const curDeck = curDecks.map((deck) => {
                    if (deck.id == curDeckIndex) {
                        return (deck);
                    }
                })
                getWordData(formData, curDeck.filter(Boolean)[0]);
                removeTermAtCurrentIndex()
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const discardEntry = () =>{//return to Study screen without saving our card.
        navigate("/Study");
    }
    const handleCurLanguageChange = (option) => {
        setCurLanguageIndex(option.value)
    }
    const handleCurDeckChange = (option) => {
        setCurDeckIndex(option.value)
    }

    const curLanguagesJSX = (
        curLanguages.map((nextLanguage) => {
            return ({value: nextLanguage.id, label: nextLanguage.name})
        }).filter(Boolean)
    )
    const decksForLanguageJSX = (
        curDecks.map((deck) => {
            if (deck.languageId == curLanguageIndex) {
                return ({value: deck.id, label: deck.name})
            }
        }).filter(Boolean)
    )
    const noDecksJSX = (
        [{value: 1, label: "no decks"}]
    )

    const incrementVocabArrayPosition = () => {
        if (positionInVocabArray + 1 >= vocabStash.length){
            setPositionInVocabArray(0)
            formData.wordText=vocabStash[0];
        }
        else {
            formData.wordText=vocabStash[positionInVocabArray + 1];
            setPositionInVocabArray(positionInVocabArray + 1);
        }

    }

    return (
        <>
        <div className="page-container">
            <div className="form-row">
            vocab stashed: {vocabStash.length}
            <button className='add-button' onClick={incrementVocabArrayPosition}>next</button>
            <button className='add-button' onClick={removeTermAtCurrentIndex}>remove</button>
        </div>
        </div>
        <hr></hr>
        <div className="AddWordForm">
            <form onSubmit={handleSubmit((data) => {
                console.log("submit")
            })}>
                <div className="addWordColumn">
                    <div className="form-row">
                        <label>Word:</label>
                        <input {...register("wordText", { required: " please enter a word"})} type="text" name="wordText" id="wordText" value={formData.wordText} onChange={handleChange}/>
                        {errors.wordText && <span>{errors.wordText.message}</span>}
                    </div>
                    <div className="form-row">
                        <label>Image:</label>
                        <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange}/>
                        <img className="mnemonic-image" src={formData.imageUrl}/>
                    </div>
                    <div className="form-row">
                        <label>Soundfile:</label>
                        <input type="file" name="soundfilePath" id="soundfilePath" onChange={handleSoundfileChange}/>
                        {selectedFile && <audio controls autoPlay src={URL.createObjectURL(selectedFile)}></audio>}
                    </div>
                    <div className="form-row">
                        <label>Language:</label>
                        <Dropdown dropdownName="language-dropdown" curValue={curLanguageIndex} options={curLanguagesJSX} onSelect={handleCurLanguageChange}/>
                    </div>
                    <div className="form-row">
                        <label>Deck:</label>
                        <Dropdown dropdownName="deck-dropdown" curValue={curDeckIndex} options={curLanguageIndex ? decksForLanguageJSX : noDecksJSX} onSelect={handleCurDeckChange} curLang={curLanguageIndex}/>
                        <span>{showDropdownError && "select a deck"}</span>
                    </div>
                    <div className="form-row">
                        <button type="submit" onClick={sendData}>commit</button>
                        <button onClick={discardEntry}>back</button>
                    </div>
                </div>
                {/* <div className="addWordColumn">
                    <div className="form-row">
                        {errors.wordText && <span>{errors.wordText.message}</span>}
                    </div>
                    <div className="form-row">
                        <img className="mnemonic-image" src={formData.imageUrl}/>
                    </div>
                    <div className="form-row">
                        {selectedFile && <audio controls autoPlay src={URL.createObjectURL(selectedFile)}></audio>}
                    </div>
                </div> */}


            </form>
        </div>
        </>

    );
}

export default CreateFromStash;