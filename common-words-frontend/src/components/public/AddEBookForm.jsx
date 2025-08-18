import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import EBookCommitDisplay from './EBookCommitDisplay';

const AddEBookForm = ({getEBookData}) => {
    const {handleSubmit, formState: { errors} } = useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const [curEBookUrl, setCurEBookUrl] = useState("")
    const [formData, setFormData] = useState({
        languageID: 0,
        title: "",
        fileName: "",
        creator: "",
        releaseDate: "",
        readingLevel: 0
    })

    const handleEBookChange = (e) => {
        console.log(e.target.files[0])
        setSelectedFile(e.target.files[0]);
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            fileName: e.target.files[0].name, 
        }));
        
    }

    const sendData = async () =>{
        //saving the new flashCard to database. 
        //first we attempt to save soundfile, and if that is successful, we send the
        //data object to App.jsx to sava to the database.
        const eBookFormData = new FormData();
        eBookFormData.append("file", selectedFile);
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: eBookFormData,
            });
            if (response.ok){
                setSelectedFile(null);
                setCurEBookUrl(formData.fileName);
                navigate("/Read");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const discardEntry = () =>{
        getEBookData("");
        navigate("/Read");
    }
    
    return (
        <div className="AddWordForm">
            <form onSubmit={handleSubmit((data) => {
                console.log(data)
            })}>
                <div className="addWordColumn">
                    <div className="form-row">
                        <label>Soundfile:</label>
                        <input type="file" name="eBookPath" id="eBookPath" onChange={handleEBookChange}/>
                    </div>
                    <div className="form-row">
                        <button type="submit" onClick={sendData}>commit</button>
                        <button onClick={discardEntry}>back</button>
                    </div>
                </div>
            </form>
            {curEBookUrl && <EBookCommitDisplay bookUrl={'/api/download/' + curEBookUrl} />}
            
        </div>

    );
}

export default AddEBookForm;