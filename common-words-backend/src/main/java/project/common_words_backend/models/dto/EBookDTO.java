package project.common_words_backend.models.dto;

import project.common_words_backend.models.User;

public class EBookDTO {
    private int languageID;
    private int userId;
    private String title;
    private String creator;
    private String releaseDate;
    private String subject;
    private int readingLevel;
    private String originalPublication;
    private String category;

    public EBookDTO() {
    }
    public EBookDTO(int languageID, int userId, String title, String creator, String releaseDate, String subject, int readingLevel, String originalPublication, String category) {
        this.languageID = languageID;
        this.userId = userId;
        this.title = title;
        this.creator = creator;
        this.releaseDate = releaseDate;
        this.subject = subject;
        this.readingLevel = readingLevel;
        this.originalPublication = originalPublication;
        this.category = category;
    }

    public int getLanguageID() {
        return languageID;
    }

    public void setLanguageID(int languageID){
        this.languageID = languageID;
    }

    public int getUserId() {
        return userId;
    }

    public void setUser(int userId){
        this.userId = userId;
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