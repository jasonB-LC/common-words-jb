package project.common_words_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common_words_backend.models.Deck;
import project.common_words_backend.models.Language;
import project.common_words_backend.models.dto.LanguageDTO;
import project.common_words_backend.repositories.LanguageRepository;

import java.util.List;

@CrossOrigin(origins = "*", maxAge =3600)
@RestController
@RequestMapping("/languages")
public class LanguageController {
    @Autowired
    LanguageRepository languageRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllDecks() {
        List<Language> allLanguages = languageRepository.findAll();
        return new ResponseEntity<>(allLanguages, HttpStatus.OK); // 200
    }

    @PutMapping(value="/{id}", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateLanguage(@PathVariable int id, @RequestBody LanguageDTO languageData){

        Language newLanguage= new Language(languageData.getName());
        newLanguage.setId(id);
        languageRepository.save(newLanguage);
        return new ResponseEntity<>(newLanguage, HttpStatus.CREATED);
    }

    @PostMapping(value="", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewLanguage(@RequestBody LanguageDTO languageData){

        Language newLanguage= new Language(languageData.getName());
        languageRepository.save(newLanguage);
        return new ResponseEntity<>(newLanguage, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void deleteLanguage(@PathVariable int id){
        languageRepository.deleteById(id);
    }
}
