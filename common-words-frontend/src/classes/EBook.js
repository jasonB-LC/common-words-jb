export default class EBook {
	constructor(id, languageID,  user, title, creator, releaseDate, subject, readingLevel, originalPublication, categories) {
        this.id = id;
        this.languageID = languageID;
        this.user = user;
        this.title = title;
        this.creator = creator;
        this.releaseDate = releaseDate;
        this.subject = subject;
        this.readingLevel = readingLevel;
        this.originalPublication = originalPublication;
        this.categories = categories;
    }
}