package project.common_words_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import project.common_words_backend.models.joins.FlashCard_WordProperties;

import java.util.ArrayList;
import java.util.List;

@Entity
public class FlashCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "deck_id")
    @JsonBackReference(value="deck-flashcard")
    private Deck deck;

//    @OneToMany(mappedBy = "flashCard")
//    @JsonManagedReference(value="flashCard-properties")
//    private List<FlashCard_WordProperties> properties = new ArrayList<>();

    private long daysUntilDue;
    private long dateOfLastReview;
    private String wordText;
    @Lob
    private String imageUrl;
    @Lob
    private String soundfilePath;
    public FlashCard(){
    }
    public FlashCard(Deck deck, long daysUntilDue, long dateOfLastReview, String wordText, String imageUrl, String soundfilePath) {
        this.deck = deck;
        this.daysUntilDue = daysUntilDue;
        this.dateOfLastReview = dateOfLastReview;
        this.wordText = wordText;
        this.imageUrl = imageUrl;
        this.soundfilePath = soundfilePath;
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
