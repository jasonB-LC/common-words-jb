package project.common_words_backend.models.dto;

import java.util.List;

public class DeckDTO {
    private String name;
    private int userId;
    private int languageId;
    private List<Integer> flashCardIds;
    public DeckDTO() {
    }

    public DeckDTO(String name, int languageId, List<Integer> flashCardsIds) {
        this.name = name;
        this.languageId = languageId;
        this.flashCardIds = flashCardsIds;
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

    public List<Integer> getFlashCardIds(){
        return flashCardIds;
    }
}
