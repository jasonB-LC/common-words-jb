package project.common_words_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class FlashCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "deck_id")
    @JsonBackReference
    private Deck deck;

    private int daysUntilDue;
    private int dateOfLastReview;

    public FlashCard(){
    }
    public FlashCard(Deck deck, int daysUntilDue, int dateOfLastReview) {
        this.deck = deck;
        this.daysUntilDue = daysUntilDue;
        this.dateOfLastReview = dateOfLastReview;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public Deck getDeck() {
        return deck;
    }
    public void setDeck(Deck deck) {
        this.deck = deck;
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
