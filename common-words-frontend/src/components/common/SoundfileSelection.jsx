import { useState, useEffect } from "react";

const SoundfileSelection = ({id, onFileChange}) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileName, setFileName] = useState("select a new file");
    
    const handleSoundfileChange = (e) =>{
        setFileName(e.target.files[0].name);
        setSelectedFile(e.target.files[0]);
    }

    useEffect(() => {
        onFileChange(selectedFile, fileName);
    }, [selectedFile, fileName]);

    return (
        <td className="soundfile-cell" name="soundfilePath">
            <input type="file" name={"soundfile" + id.toString()} id={"soundfile" + id.toString()} style={{display: "none"}} onChange={handleSoundfileChange}></input>
            <label for={"soundfile" + id.toString()} class="custom-file-button"></label>
            <span id="fileDisplayName">{fileName}</span>
        </td>
    );
}

export default SoundfileSelection;