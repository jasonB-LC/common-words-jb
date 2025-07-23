package project.common_words_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
public class WordProperty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "word_property_type_id")
    @JsonBackReference
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
