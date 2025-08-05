package project.common_words_backend.models;

import jakarta.persistence.*;

@Entity
public class WordClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    public WordClass() {
    }

    public WordClass(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}