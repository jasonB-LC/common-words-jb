const AddLanguageForm = ({newLanguage, handleChange, handleLanguageSubmit, handleLanguageBack}) => {
    return (
        <form className="input-word-form">
            <button className="addLanguage" onClick={handleLanguageBack}>x</button>
            <input className="language-input" type="text" value={newLanguage} onChange={handleChange}/>
            <button className="language-submit" type="submit" onClick={handleLanguageSubmit}>submit</button>
        </form>
    );
}

export default AddLanguageForm;