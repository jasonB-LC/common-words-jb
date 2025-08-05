import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

const AddWordForm = ({getWordData}) => {
    //Form that accepts text, image links, and mp3s from the user and creates a flashCard to add to the current deck
    const {register, handleSubmit, formState: { errors} } = useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        wordText: "",
        imageUrl: "",
        soundfilePath: "",
        daysUntilNextReview: 0,
        dateOfLastReview: Date.now()
    })

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

    const sendData = async () =>{
        //saving the new flashCard to database. 
        //first we attempt to save soundfile, and if that is successful, we send the
        //data object to App.jsx to sava to the database.
        const soundfileFormData = new FormData();
        soundfileFormData.append("file", selectedFile);
        try {
            const response = await fetch('http://localhost:8080/upload', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: soundfileFormData,
            });
            if (response.ok){
                setSelectedFile(null);
                getWordData(formData);
                navigate("/Study");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const discardEntry = () =>{//return to Study screen without saving our card.
        getWordData("");
        navigate("/Study");
    }
    
    return (
        <div className="AddWordForm">
            <form onSubmit={handleSubmit((data) => {
                console.log(data)
            })}>
                <div className="form-group">
                    <label>Word:</label>
                    <input {...register("wordText", { required: " please enter a word"})} type="text" name="wordText" id="wordText" value={formData.wordText} onChange={handleChange}/>
                    {errors.wordText && <span>{errors.wordText.message}</span>}
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange}/>
                    <img className="mnemonic-image" src={formData.imageUrl}/>
                </div>
                <div className="form-group">
                    <label>Soundfile:</label>
                    <input type="file" name="soundfilePath" id="soundfilePath" onChange={handleSoundfileChange}/>
                    {selectedFile && <audio controls autoPlay src={URL.createObjectURL(selectedFile)}></audio>}
                </div>

                <button type="submit" onClick={sendData}>commit</button>
                {/* <button type="submit" onClick={onSubmit}>commit</button> */}
                <button onClick={discardEntry}>back</button>
            </form>
        </div>

    );
}

export default AddWordForm;