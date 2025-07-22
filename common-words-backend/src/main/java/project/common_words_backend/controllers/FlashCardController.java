package project.common_words_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import project.common_words_backend.models.EBook;
import project.common_words_backend.models.FlashCard;
import project.common_words_backend.repositories.EBookRepository;
import project.common_words_backend.repositories.FlashCardRepository;

import java.util.List;

public class FlashCardController {
    @Autowired
    FlashCardRepository flashCardRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllEBooks() {
        List<FlashCard> allFlashCards = flashCardRepository.findAll();
        return new ResponseEntity<>(allFlashCards, HttpStatus.OK); // 200
    }

    
}
