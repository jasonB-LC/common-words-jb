export default class EBook {
	constructor(id, languageID, title, fileName, creator, releaseDate,  readingLevel, bookProgress) {
        this.id = id;
        this.languageID = languageID;
        this.title = title;
        this.fileName = fileName;
        this.creator = creator;
        this.releaseDate = releaseDate;
        this.readingLevel = readingLevel;
        this.bookProgress = bookProgress;
    }
}