package project.common_words_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Language {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @OneToMany(mappedBy="language")
    @JsonManagedReference(value="language-eBooks")
    private final List<EBook> eBooks = new ArrayList<>();

    public Language() {
    }

    public Language(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
//    public List<Deck> getDecks(){
//        return decks;
//    }

    public void setId(int id) {
        this.id = id;
    }
    public int getId() {
        return id;
    }

}


