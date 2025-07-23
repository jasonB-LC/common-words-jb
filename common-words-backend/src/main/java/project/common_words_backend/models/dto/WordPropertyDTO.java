package project.common_words_backend.models.dto;

public class WordPropertyDTO {
    private int wordPropertyTypeId;
    private String value;

    public WordPropertyDTO() {
    }
    public WordPropertyDTO(int wordPropertyTypeId, String value) {
        this.wordPropertyTypeId = wordPropertyTypeId;
        this.value = value;
    }
    public int getWordPropertyTypeId() {
        return wordPropertyTypeId;
    }
    public void setWordPropertyTypeId(int wordPropertyTypeId) {
        this.wordPropertyTypeId = wordPropertyTypeId;
    }
    public String getValue() {
        return value;
    }
    public void setValue(String value) {
        this.value = value;
    }
}
