const CreateEBookForm = ({input, handleChange, handleSubmit}) => {
    return (
        <form className="input-word-form">
            <input className="language-input" type="text" size="100" value={input} onChange={handleChange}/>
            <button className="language-submit" type="submit" onClick={handleSubmit}>submit</button>
        </form>
    );
}

export default CreateEBookForm;