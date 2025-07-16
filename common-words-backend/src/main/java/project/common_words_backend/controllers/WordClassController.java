package project.common_words_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.common_words_backend.models.WordClass;
import project.common_words_backend.models.dto.WordClassDTO;
import project.common_words_backend.repositories.WordClassRepository;

@RestController
@RequestMapping("/word-classes")
public class WordClassController {
    @Autowired
    WordClassRepository wordClassRepository;

    @PostMapping(value="", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewWordClass(@RequestBody WordClassDTO wordClassData){

        WordClass newWordClass= new WordClass(wordClassData.getName());
        wordClassRepository.save(newWordClass);
        return new ResponseEntity<>(newWordClass, HttpStatus.CREATED);
    }
}
