package project.common_words_backend.models.dto;

public class FlashCard_WordPropertiesDTO {
    private int flashCardId;
    private int wordPropertyId;
    private Boolean isFront;

    public FlashCard_WordPropertiesDTO() {
    }
    public FlashCard_WordPropertiesDTO(int flashCardId, int wordPropertyId, Boolean isFront) {
        this.flashCardId = flashCardId;
        this.wordPropertyId = wordPropertyId;
        this.isFront = isFront;
    }
    public int getFlashCardId() {
        return flashCardId;
    }
    public void setFlashCardId(int flashCardId) {
        this.flashCardId = flashCardId;
    }
    public int getWordPropertyId() {
        return wordPropertyId;
    }
    public void setWordPropertyId(int wordPropertyId) {
        this.wordPropertyId = wordPropertyId;
    }
    public Boolean getIsFront() {
        return isFront;
    }
    public void setIsFront(Boolean isFront) {
        this.isFront = isFront;
    }

}
