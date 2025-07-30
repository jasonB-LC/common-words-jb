package project.common_words_backend.models.dto;

import project.common_words_backend.models.Deck;

public class FlashCardDTO {
    private int deckId;
    private long daysUntilDue;
    private long dateOfLastReview;

    public FlashCardDTO() {
    }
    public FlashCardDTO(int deckId, long daysUntilDue, long dateOfLastReview) {
        this.deckId = deckId;
        this.daysUntilDue = daysUntilDue;
        this.dateOfLastReview = dateOfLastReview;
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
}
