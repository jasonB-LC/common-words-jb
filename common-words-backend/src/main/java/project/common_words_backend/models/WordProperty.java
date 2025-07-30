package project.common_words_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import project.common_words_backend.models.joins.FlashCard_WordProperties;

import java.util.ArrayList;
import java.util.List;

@Entity
public class WordProperty {
    //WordProperty is a data model for containing and labeling the different elements of a flash card, such as text,
    // sound, and image links
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "wordProperty")
    @JsonManagedReference
    private final List<FlashCard_WordProperties> flashcardWordProperties = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "word_property_type_id")
    @JsonBackReference(value="wordPropertyType-wordProperty")
    private WordPropertyType wordPropertyType;

    private String value;

    public WordProperty() {
    }

    public WordProperty(WordPropertyType wordPropertyType, String value) {
        this.wordPropertyType = wordPropertyType;
        this.value = value;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public WordPropertyType getWordPropertyType() {
        return wordPropertyType;
    }
    public void setWordPropertyType(WordPropertyType wordPropertyType) {
        this.wordPropertyType = wordPropertyType;
    }
    public String getValue() {
        return value;
    }
    public void setValue(String value) {
        this.value = value;
    }


}
