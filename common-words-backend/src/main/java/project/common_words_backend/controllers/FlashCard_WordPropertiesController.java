package project.common_words_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.common_words_backend.models.*;
import project.common_words_backend.models.dto.EBookDTO;
import project.common_words_backend.models.dto.FlashCard_WordPropertiesDTO;
import project.common_words_backend.models.joins.FlashCard_WordProperties;
import project.common_words_backend.repositories.FlashCardRepository;
import project.common_words_backend.repositories.FlashCard_WordPropertiesRepository;
import project.common_words_backend.repositories.WordPropertyRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/flashCardWordProperties")
public class FlashCard_WordPropertiesController {
    @Autowired
    FlashCard_WordPropertiesRepository flashCard_WordPropertiesRepository;

    @Autowired
    FlashCardRepository flashCardRepository;

    @Autowired
    WordPropertyRepository wordPropertyRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllDecks() {
        List<FlashCard_WordProperties> flashCard_WordProperties = flashCard_WordPropertiesRepository.findAll();
        return new ResponseEntity<>(flashCard_WordProperties, HttpStatus.OK); // 200
    }

    @PostMapping(value="", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewEBook(@RequestBody FlashCard_WordPropertiesDTO flashCard_WordPropertiesDTO){
        FlashCard flashCard = flashCardRepository.findById(flashCard_WordPropertiesDTO.getFlashCardId()).orElse(null);
        WordProperty wordProperty = wordPropertyRepository.findById(flashCard_WordPropertiesDTO.getWordPropertyId()).orElse(null);
        FlashCard_WordProperties newFlashCard_WordProperties = new FlashCard_WordProperties(flashCard, wordProperty, flashCard_WordPropertiesDTO.getIsFront());
        flashCard_WordPropertiesRepository.save(newFlashCard_WordProperties);
        return new ResponseEntity<>(newFlashCard_WordProperties, HttpStatus.CREATED);
    }
}
