import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

const EditForm = ({originalWord, updateFlashCard, hideForm}) => {
    //editing a flashCard that already exists in the database.
    const {register, handleSubmit, formState: { errors} } = useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: "",
        wordText: "",
        imageUrl: "",
        soundfilePath: "",
        daysUntilNextReview: 0,
        dateOfLastReview: Date.now()
    })

    useEffect (() => {
        setFormData(
            {
                id: originalWord.id,
                wordText: originalWord.wordText,
                imageUrl: originalWord.imageUrl,
                soundfilePath: originalWord.soundfilePath,
                daysUntilNextReview: 0,
                dateOfLastReview: Date.now()
            }
        )
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSoundfileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: e.target.files[0].name,
        }));
        
    }

    const sendData = async () =>{
        if (selectedFile){
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
                    updateFlashCard(formData);

                    hideForm();
                    navigate('/Study');
                }
            } catch (error) {
                console.error(error.message);
            }
        }
        else{
            updateFlashCard(formData);
            hideForm();
            navigate('/Study');
        }
    }

    return (
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
                <span>Replace? </span><audio controls src={"http://localhost:8080/files/soundfiles/" + formData.soundfilePath}></audio>
            </div>

            <button type="submit" onClick={sendData}>commit</button>
            <button onClick={hideForm}>back</button>
        </form>
    );
}

export default EditForm;