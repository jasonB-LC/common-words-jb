export default class EBook {
	constructor(id, languageID, text, title, creator, releaseDate, subject, readingLevel, originalPublication, categories) {
        this.id = id;
        this.languageID = languageID;
        this.text = text;
        this.title = title;
        this.creator = creator;
        this.releaseDate = releaseDate;
        this.subject = subject;
        this.readingLevel = readingLevel;
        this.originalPublication = originalPublication;
        this.categories = categories;
    }
}