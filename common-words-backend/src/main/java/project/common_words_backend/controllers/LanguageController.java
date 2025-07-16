package project.common_words_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.common_words_backend.models.Language;
import project.common_words_backend.models.User;
import project.common_words_backend.models.dto.LanguageDTO;
import project.common_words_backend.models.dto.UserDTO;
import project.common_words_backend.repositories.LanguageRepository;

@RestController
@RequestMapping("/languages")
public class LanguageController {
    @Autowired
    LanguageRepository languageRepository;

    @PostMapping(value="", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewLanguage(@RequestBody LanguageDTO languageData){

        Language newLanguage= new Language(languageData.getName());
        languageRepository.save(newLanguage);
        return new ResponseEntity<>(newLanguage, HttpStatus.CREATED);
    }
}
