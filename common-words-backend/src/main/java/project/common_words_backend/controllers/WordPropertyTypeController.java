package project.common_words_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common_words_backend.models.WordPropertyType;
import project.common_words_backend.models.dto.WordPropertyTypeDTO;
import project.common_words_backend.repositories.WordPropertyTypeRepository;

import java.util.List;

@RestController
@RequestMapping("/wordPropertyTypes")
public class WordPropertyTypeController {
    @Autowired
    WordPropertyTypeRepository wordPropertyTypeRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllWordPropertyTypes() {
        List<WordPropertyType> allWordPropertyTypes = wordPropertyTypeRepository.findAll();
        return new ResponseEntity<>(allWordPropertyTypes, HttpStatus.OK); // 200
    }

    @PostMapping(value="", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewWordProperty(@RequestBody WordPropertyTypeDTO wordPropertyTypeData){

        WordPropertyType newWordPropertyType = new WordPropertyType(wordPropertyTypeData.getName());
        wordPropertyTypeRepository.save(newWordPropertyType);
        return new ResponseEntity<>(newWordPropertyType, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void deleteWordTypeProperty(@PathVariable int id){
        wordPropertyTypeRepository.deleteById(id);
    }
}