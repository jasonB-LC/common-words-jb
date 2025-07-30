package project.common_words_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Deck {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private int languageId;

    @OneToMany(mappedBy="deck", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value="deck-flashcard")
    private List<FlashCard> flashCards;

    public Deck() {
    }

    public Deck(String name, int languageId) {
        this.name = name;
        this.languageId = languageId;
    }
    public List<FlashCard> getFlashCards() {
        return flashCards;
    }
    public void setFlashCards(List<FlashCard> flashCards){
        this.flashCards = flashCards;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }
    public int getLanguageId() {
        return languageId;
    }
    public void setLanguageId(int languageId) {
        this.languageId = languageId;
    }

    public void setId(int id) {
        this.id = id;
    }
}
