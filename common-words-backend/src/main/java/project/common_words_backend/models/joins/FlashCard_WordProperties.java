package project.common_words_backend.models.joins;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import project.common_words_backend.models.FlashCard;
import project.common_words_backend.models.WordProperty;

@Entity
public class FlashCard_WordProperties {
    //Custom join table for FlashCard and WordProperty. It contains a custom field, "isFront", which allows the front end
    //to place the word property on the correct side of the card.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "flashCard_id")
    @JsonBackReference
    private FlashCard flashCard;

    @ManyToOne
    @JoinColumn(name = "wordProperty_id")
    @JsonBackReference
    private WordProperty wordProperty;

    private Boolean isFront;

    public FlashCard_WordProperties() {
    }
    public FlashCard_WordProperties(FlashCard flashCard, WordProperty wordProperty, Boolean isFront) {
        this.flashCard = flashCard;
        this.wordProperty = wordProperty;
        this.isFront = isFront;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public FlashCard getFlashCard() {
        return flashCard;
    }
    public void setFlashCard(FlashCard flashCard) {
        this.flashCard = flashCard;
    }
    public WordProperty getWordProperty() {
        return wordProperty;
    }
    public void setWordProperty(WordProperty wordProperty) {
        this.wordProperty = wordProperty;
    }
    public Boolean getIsFront() {
        return isFront;
    }
    public void setIsFront(Boolean isFront) {
        this.isFront = isFront;
    }



}
