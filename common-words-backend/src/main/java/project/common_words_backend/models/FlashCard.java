package project.common_words_backend.models;

import jakarta.persistence.*;

@Entity
public class FlashCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

//    @ManyToOne
//    private Deck deck;
//
//    @OneToOne
//    private Word word;
//
//    private List<WordAttribute questions;
//    private List<WordAttribute> answers;
//    private int daysUntilDue;
//    private int dateOfLastReview;
}
