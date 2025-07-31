export default class FlashCard {
	constructor(id, daysUntilDue, dateOfLastReview, wordText, imageUrl, soundfilePath) {
        this.id = id;
        this.daysUntilDue = daysUntilDue;
        this.dateOfLastReview = dateOfLastReview;
        this.wordText = wordText;
        this.imageUrl = imageUrl;
        this.soundfilePath = soundfilePath;
    }
}