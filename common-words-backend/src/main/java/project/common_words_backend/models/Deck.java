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

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "language_id")
    @JsonBackReference
    private Language language;

    @OneToMany(mappedBy="deck")
    @JsonManagedReference
    private final List<FlashCard> flashCards = new ArrayList<>();


    public Deck() {
    }

    public Deck(String name, User user, Language language) {
        this.name = name;
        this.user = user;
    }
    public List<FlashCard> getFlashCards() {
        return flashCards;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public int getId() {
        return id;
    }
    public Language getLanguage() {
        return language;
    }
    public void setLanguage(Language language) {
        this.language = language;
    }

    public void setId(int id) {
        this.id = id;
    }
}
