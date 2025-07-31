package project.common_words_backend.models.dto;

import jakarta.persistence.Lob;
import project.common_words_backend.models.Deck;

public class FlashCardDTO {
    private int deckId;
    private long daysUntilDue;
    private long dateOfLastReview;
    private String wordText;
    @Lob
    private String imageUrl;
    @Lob
    private String soundfilePath;

    public FlashCardDTO() {
    }
    public FlashCardDTO(int deckId, long daysUntilDue, long dateOfLastReview, String wordText, String imageUrl, String soundfilePath ) {
        this.deckId = deckId;
        this.daysUntilDue = daysUntilDue;
        this.dateOfLastReview = dateOfLastReview;
        this.wordText = wordText;
        this.imageUrl = imageUrl;
        this.soundfilePath = soundfilePath;
    }
    public int getDeckId() {
        return deckId;
    }
    public void setDeckId(int deckId) {
        this.deckId = deckId;
    }
    public long getDaysUntilDue() {
        return daysUntilDue;
    }
    public void setDaysUntilDue(long daysUntilDue) {
        this.daysUntilDue = daysUntilDue;
    }
    public long getDateOfLastReview() {
        return dateOfLastReview;
    }
    public void setDateOfLastReview(long dateOfLastReview) {
        this.dateOfLastReview = dateOfLastReview;
    }
    public String getWordText(){
        return this.wordText;
    }
    public void setWordText(String wordText){
        this.wordText = wordText;
    }
    public String getImageUrl(){
        return this.imageUrl;
    }
    public void setImageUrl(String imageUrl){
        this.imageUrl = imageUrl;
    }
    public String getSoundfilePath(){
        return this.soundfilePath;
    }
    public void setSoundfilePath(String soundfilePath){
        this.soundfilePath = soundfilePath;
    }
}
