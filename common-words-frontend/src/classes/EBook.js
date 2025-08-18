export default class EBook {
	constructor(id, languageID, title, fileName, creator, releaseDate,  readingLevel) {
        this.id = id;
        this.languageID = languageID;
        this.title = title;
        this.fileName = fileName;
        this.creator = creator;
        this.releaseDate = releaseDate;
        this.readingLevel = readingLevel;
    }
}