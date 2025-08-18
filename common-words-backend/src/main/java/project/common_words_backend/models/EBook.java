package project.common_words_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class EBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "language_id")
    @JsonBackReference(value="eBook-language")
    private Language language;
    private String title;
    private String fileName;
    private String creator;
    private String releaseDate;
    private int readingLevel;
    public EBook() {
    }

    public EBook(Language language, String title, String fileName, String creator, String releaseDate,  int readingLevel) {

        this.language = language;
        this.title = title;
        this.fileName = fileName;
        this.creator = creator;
        this.releaseDate = releaseDate;
        this.readingLevel = readingLevel;

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

    public String getTitle() {
        return title;
    }


    public String getFileName() {return fileName;}

    public void setFileName(String fileName) {this.fileName = fileName;}

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

    public int getReadingLevel() {
        return readingLevel;
    }

    public void setReadingLevel(int readingLevel) {
        this.readingLevel = readingLevel;
    }

}
