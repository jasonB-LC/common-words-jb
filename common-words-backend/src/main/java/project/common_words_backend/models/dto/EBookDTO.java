package project.common_words_backend.models.dto;

import jakarta.persistence.Column;

import java.util.List;

public class EBookDTO {
    private int languageID;
    private int userId;
    @Column(columnDefinition = "MEDIUMTEXT")
    private String text;
    private String title;
    private String creator;
    private String releaseDate;
    private String subject;
    private int readingLevel;
    private String originalPublication;
    private int categoryId;

    public EBookDTO() {
    }
    public EBookDTO(int languageID, String text, String title, String creator, String releaseDate, String subject, int readingLevel, String originalPublication, int categoryId) {
        this.languageID = languageID;
        this.text = text;
        this.title = title;
        this.creator = creator;
        this.releaseDate = releaseDate;
        this.subject = subject;
        this.readingLevel = readingLevel;
        this.originalPublication = originalPublication;
        this.categoryId = categoryId;
    }

    public int getLanguageId() {
        return languageID;
    }

    public void setLanguageId(int languageID){
        this.languageID = languageID;
    }

    public String getText() { return text; }

    public void setText(String text)  { this.text = text; }

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

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }
}