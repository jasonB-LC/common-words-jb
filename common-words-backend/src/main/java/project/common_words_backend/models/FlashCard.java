package project.common_words_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class FlashCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "deck_id")
    @JsonBackReference
    private Deck deck;

//    @ManyToMany
//    @JsonManagedReference
//    @JoinTable(name = "flashcards_front_properties", joinColumns = @JoinColumn(name = "flashcard_id"), inverseJoinColumns = @JoinColumn(name = "front_category_id"))
//    private List<WordPropertyType> properties = new ArrayList<>();

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
