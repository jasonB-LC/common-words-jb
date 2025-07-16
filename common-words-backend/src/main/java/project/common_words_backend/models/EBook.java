package project.common_words_backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
public class EBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

//    @ManyToOne
//    @JsonManagedReference
    private int languageID;

    @ManyToOne
    @JsonManagedReference
    private User user;

    private String title;
    private String creator;
    private String releaseDate;
    private String subject;
    private int readingLevel;
    private String originalPublication;

//    @ManyToOne
//    @JsonManagedReference
    private String category;

    public EBook() {
    }

    public EBook(int languageID, User user, String title, String creator, String releaseDate, String subject, int readingLevel, String originalPublication, String category) {
        this.languageID = languageID;
        this.user = user;
        this.title = title;
        this.creator = creator;
        this.releaseDate = releaseDate;
        this.subject = subject;
        this.readingLevel = readingLevel;
        this.originalPublication = originalPublication;
        this.category = category;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getLanguageID() {
        return languageID;
    }

    public void setLanguageID(int languageID) {
        this.languageID = languageID;
    }

    public User getUserId() {
        return user;
    }

    public void setUserId(User user) {
        this.user = user;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }




}
