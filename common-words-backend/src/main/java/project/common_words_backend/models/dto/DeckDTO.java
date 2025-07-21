package project.common_words_backend.models.dto;

public class DeckDTO {
    private String name;
    private int userId;

    public DeckDTO() {
    }

    public DeckDTO(String name, int userId) {
        this.name = name;
        this.userId = userId;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
