package project.common_words_backend.models.dto;

public class DeckDTO {
    private String name;
    private int userId;
    private int languageId;

    public DeckDTO() {
    }

    public DeckDTO(String name, int languageId) {
        this.name = name;
        this.languageId = languageId;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getLanguageId(){
        return languageId;
    }
    public void setLanguageId(int languageId){
        this.languageId = languageId;
    }
}
