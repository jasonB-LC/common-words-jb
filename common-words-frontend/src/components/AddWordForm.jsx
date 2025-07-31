import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";

const AddWordForm = ({getWordData}) => {
    const navigate = useNavigate();
    const [soundfileInternalPath, setSoundfileInternalPath] = useState("")
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
    
    const sendData = () =>{
        console.log("text " + formData.wordText);

        getWordData(formData);
        navigate("/Study");

    }

    const discardEntry = () =>{
        getWordData("");
        navigate("/Study");
    }
    
    return (
        <form>
            <div className="form-group">
                <label>Word:</label>
                <input type="text" name="wordText" id="wordText" value={formData.wordText} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Image:</label>
                <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Soundfile:</label>
                <input type="text" name="soundfilePath" id="soundfilePath" value={formData.soundfilePath} onChange={handleChange}/>
            </div>

            <button type="submit" onClick={sendData}>commit</button>
            <button onClick={discardEntry}>back</button>
        </form>
    );
}

export default AddWordForm;