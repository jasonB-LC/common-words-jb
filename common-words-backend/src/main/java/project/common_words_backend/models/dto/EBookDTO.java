package project.common_words_backend.models.dto;

import jakarta.persistence.Column;

import java.util.List;

public class EBookDTO {
    private int languageID;
    private String title;
    private String fileName;
    private String creator;
    private String releaseDate;
    private int readingLevel;

    private int lastPage;///TODO: implement this

    public EBookDTO() {
    }
    public EBookDTO(int languageID, String title, String fileName, String creator, String releaseDate,  int readingLevel) {
        this.languageID = languageID;
        this.title = title;
        this.fileName = fileName;
        this.creator = creator;
        this.releaseDate = releaseDate;
        this.readingLevel = readingLevel;
    }

    public int getLanguageId() {
        return languageID;
    }

    public void setLanguageId(int languageID){
        this.languageID = languageID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFileName() {return fileName;}

    public void setFileName(String fileName) {this.fileName = fileName;}

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