package project.common_words_backend.models.dto;

import project.common_words_backend.models.Deck;

public class FlashCardDTO {
    private int deckId;
    private int daysUntilDue;
    private int dateOfLastReview;

    public FlashCardDTO() {
    }
    public FlashCardDTO(int deckId, int daysUntilDue, int dateOfLastReview) {
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
    public int getDaysUntilDue() {
        return daysUntilDue;
    }
    public void setDaysUntilDue(int daysUntilDue) {
        this.daysUntilDue = daysUntilDue;
    }
    public int getDateOfLastReview() {
        return dateOfLastReview;
    }
    public void setDateOfLastReview(int dateOfLastReview) {
        this.dateOfLastReview = dateOfLastReview;
    }
}
