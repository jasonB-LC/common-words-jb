import {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import EBookCommitDisplay from './EBookCommitDisplay';

const AddEBookForm = ({getEBookData, back}) => {
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
        readingLevel: 0,
        bookProgress: ""
    })

    useEffect (() => {
        if(selectedFile){
            saveFile();
        }
        
    }, [selectedFile])

    const getEBookMetadata = (metadata) => {
        console.log(metadata)
        setFormData({
            languageID: 1,
            title: metadata.title,
            fileName: curEBookUrl,
            creator: metadata.creator,
            releaseDate: metadata.pubdate,
            readingLevel: 0,
            bookProgress: ""
        })
    }

    const handleEBookSave = (e) => {
        console.log(formData)
        getEBookData(formData);

    }

    const handleEBookChange = (e) => {
        console.log(e.target.files[0])
        setSelectedFile(e.target.files[0]);
        setFormData((prevData) => ({
            ...prevData,
            fileName: e.target.files[0].name, 
        }));
        
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const saveFile = async () => {
        console.log(selectedFile);
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
                console.log(formData.fileName);
                navigate("/Read");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const additionalFormFields = (
        <>
            <div className="form-row">
                <label>Title:</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange}/>
            </div>
            <div className="form-row">
                <label>Author:</label>
                <input type="text" name="creator" id="creator" value={formData.creator} onChange={handleChange}/>
            </div>
            <div className="form-row">
                <button type="submit" onClick={handleEBookSave}>save book?</button>
            </div>
        </>

        
    )

    return (
        <>
        {<div className="drawer-overlay" onClick={back}></div>}
        <div className="add-eBook-form">
            <div className="form-row-button"><button onClick={back}>back</button></div>
            <form onSubmit={handleSubmit((data) => {
                console.log(data)
            })}>
                <div>

                    <div>Upload ePub file:</div>
                    <div className="form-row">
                        <label>eBook:</label>
                        <input type="file" name="eBookPath" id="eBookPath" onChange={handleEBookChange}/>
                    </div>
                    {selectedFile && <div>{!curEBookUrl && "loading..." }</div>}
                    {formData.title && additionalFormFields}

                </div>
            </form>
            {curEBookUrl && <EBookCommitDisplay selectedUrl={curEBookUrl} getEBookMetadata={getEBookMetadata} />}
            
        </div>
        </>
    );
}

export default AddEBookForm;