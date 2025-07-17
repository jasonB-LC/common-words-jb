package project.common_words_backend.models.dto;

public class LanguageDTO {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

//    @JoinTable(
//            name = "Employee_Project",
//            joinColumns = { @JoinColumn(name = "employee_id") },
//            inverseJoinColumns = { @JoinColumn(name = "project_id") }
//    )
}