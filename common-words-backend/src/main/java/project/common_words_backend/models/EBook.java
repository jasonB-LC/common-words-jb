package project.common_words_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class EBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "language_id")
    @JsonBackReference
    private Language language;

    @ManyToMany
    @JsonManagedReference
    @JoinTable(name = "eBooks_categories", joinColumns = @JoinColumn(name = "eBook_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<Category> categories = new ArrayList<>();

    private int languageID;

    private String title;
    private String creator;
    private String releaseDate;
    private String subject;
    private int readingLevel;
    private String originalPublication;

    public EBook() {
    }

    public EBook(Language language, String title, String creator, String releaseDate, String subject, int readingLevel, String originalPublication, List<Category> categories) {

        this.language = language;
        this.title = title;
        this.creator = creator;
        this.releaseDate = releaseDate;
        this.subject = subject;
        this.readingLevel = readingLevel;
        this.originalPublication = originalPublication;
        this.categories = categories;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public int getLanguageID() {
        return languageID;
    }

    public void setLanguageID(int languageID) {
        this.languageID = languageID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public int getReadingLevel() {
        return readingLevel;
    }

    public void setReadingLevel(int readingLevel) {
        this.readingLevel = readingLevel;
    }

    public String getOriginalPublication() {
        return originalPublication;
    }

    public void setOriginalPublication(String originalPublication) {
        this.originalPublication = originalPublication;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

}
