import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";

const AddWordForm = ({getWordData}) => {
    const {register, handleSubmit, formState: { isValid} } = useForm({mode: 'onChange'});
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const [soundfileUploaded, setSoundfileUploaded] = useState(false);
    const [formData, setFormData] = useState({
        wordText: "",
        imageUrl: "",
        soundfilePath: "",
        daysUntilNextReview: 0,
        dateOfLastReview: Date.now()
    })

    const onSubmit = (data) => {}
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
        console.log(e.target.files);
        setFormData((prevData) => ({
            ...prevData,
            [name]: e.target.files[0].name,
        }));
        
    }

    const sendData = async () =>{
        const soundfileFormData = new FormData();
        console.log("selectedFile: ");
        console.log(selectedFile); 
        soundfileFormData.append("file", selectedFile);
        console.log("soundfile form data : " + soundfileFormData)
        try {
			const response = await fetch('http://localhost:8080/upload', {
				method: 'POST',
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
				body: soundfileFormData,
			});
            if (response.ok){
                getWordData(formData);
                navigate("/Study");
            }
		} catch (error) {
            console.log("soundfile error:")
			console.error(error.message);
		}
    }

    const discardEntry = () =>{
        getWordData("");
        navigate("/Study");
    }
    
    return (
        <form onSubmit={handleSubmit((data) => {
            console.log(data)
        })}>
            <div className="form-group">
                <label>Word:</label>
                <input {...register("wordText", { required: "this is required"})} type="text" name="wordText" id="wordText" value={formData.wordText} onChange={handleChange}/>
                {/* <span>{errors.name}</span> */}
            </div>
            <div className="form-group">
                <label>Image:</label>
                <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Soundfile:</label>
                <input type="file" name="soundfilePath" id="soundfilePath" onChange={handleSoundfileChange}/>
            </div>

            <button type="submit" onClick={sendData}>commit</button>
            {/* <button type="submit" onClick={onSubmit}>commit</button> */}
            <button onClick={discardEntry}>back</button>
        </form>
    );
}

export default AddWordForm;