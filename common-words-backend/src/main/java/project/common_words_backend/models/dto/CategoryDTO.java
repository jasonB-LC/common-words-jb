package project.common_words_backend.models.dto;

import project.common_words_backend.models.User;

public class CategoryDTO {

    private String name;
    private int eBookId;
    
    public CategoryDTO() {
    }
    
    public CategoryDTO(String name, int eBookId) {
        this.name = name;
        this.eBookId = eBookId;
    }
    public int getEBookId() {
        return eBookId;
    }
    public void setEBookId(int eBookId) {
        this.eBookId = eBookId;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name, int eBookId) {
        this.name = name;
    }
    
}