package project.common_words_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common_words_backend.models.WordProperty;
import project.common_words_backend.models.WordPropertyType;
import project.common_words_backend.models.dto.WordPropertyDTO;
import project.common_words_backend.repositories.WordPropertyRepository;
import project.common_words_backend.repositories.WordPropertyTypeRepository;

import java.util.List;

@CrossOrigin(origins = "*", maxAge =3600)
@RestController
@RequestMapping("/wordProperties")
public class WordPropertyController {
    @Autowired
    private WordPropertyRepository wordPropertyRepository;

    @Autowired
    private WordPropertyTypeRepository wordPropertyTypeRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllWordProperties() {
        List<WordProperty> allWordProperties = wordPropertyRepository.findAll();
        return new ResponseEntity<>(allWordProperties, HttpStatus.OK);
    }

    @PostMapping(value="", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewWordProperty(@RequestBody WordPropertyDTO wordPropertyData){
        WordPropertyType wordPropertyType = wordPropertyTypeRepository.findById(wordPropertyData.getWordPropertyTypeId()).orElse(null);;
        WordProperty newWordProperty = new WordProperty(wordPropertyType, wordPropertyData.getValue());
        wordPropertyRepository.save(newWordProperty);
        return new ResponseEntity<>(newWordProperty, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void deleteWordProperty(@PathVariable int id){
        wordPropertyRepository.deleteById(id);
    }
}
